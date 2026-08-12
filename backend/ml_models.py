import pickle
import pandas as pd
import numpy as np
from typing import List, Dict, Any
from config import settings
import joblib
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
import json

class MLModelService:
    def __init__(self):
        self.runoff_model = None
        self.structure_model = None
        self.harvest_model = None
        self.cost_model = None
        self.label_encoders = {}
        self.scalers = {}
        self.load_models()
    
    def load_models(self):
        """Load trained ML models, automatically training fallback models if .pkl files are LFS pointers or missing"""
        import os
        base_dir = os.path.dirname(os.path.abspath(__file__))
        try:
            # Load runoff coefficient model
            self.runoff_model = joblib.load(os.path.join(base_dir, 'runoff_model.pkl'))
            self.label_encoders['roof_type'] = joblib.load(os.path.join(base_dir, 'roof_type_encoder.pkl'))
            
            # Load structure recommendation model
            self.structure_model = joblib.load(os.path.join(base_dir, 'structure_model.pkl'))
            self.label_encoders['soil_type'] = joblib.load(os.path.join(base_dir, 'soil_type_encoder.pkl'))
            self.label_encoders['aquifer_type'] = joblib.load(os.path.join(base_dir, 'aquifer_type_encoder.pkl'))
            
            # Load water harvest model
            self.harvest_model = joblib.load(os.path.join(base_dir, 'harvest_model.pkl'))
            
            # Load cost model
            self.cost_model = joblib.load(os.path.join(base_dir, 'cost_model.pkl'))
            self.label_encoders['recommended_structure'] = joblib.load(os.path.join(base_dir, 'structure_encoder.pkl'))
            
            self.models_loaded = True
            print("ML models loaded successfully!")
        except Exception as e:
            print(f"Primary ML models could not be loaded ({e}). Training fallback models...")
            self._train_and_load_fallback_models(base_dir)

    def _train_and_load_fallback_models(self, base_dir: str):
        """Train and load fast fallback models if binary .pkl files are LFS pointers or missing"""
        import os
        try:
            # 1. Encoders
            roof_type_le = LabelEncoder()
            roof_types = ['Concrete', 'Tiled', 'Metal', 'Asbestos', 'Thatched', 'Plastic', 'Other']
            roof_type_le.fit(roof_types)
            self.label_encoders['roof_type'] = roof_type_le

            soil_type_le = LabelEncoder()
            soil_types = ['Sandy', 'Sandy Loam', 'Clay', 'Clay Loam', 'Silt', 'Rocky', 'Loamy']
            soil_type_le.fit(soil_types)
            self.label_encoders['soil_type'] = soil_type_le

            aquifer_type_le = LabelEncoder()
            aquifer_types = ['Alluvial', 'Hard Rock', 'Sedimentary', 'Unconsolidated', 'Confined', 'Unconfined']
            aquifer_type_le.fit(aquifer_types)
            self.label_encoders['aquifer_type'] = aquifer_type_le

            structure_le = LabelEncoder()
            structures = ["Storage_Tank", "Recharge_Pit", "Recharge_Trench", "Recharge_Shaft"]
            structure_le.fit(structures)
            self.label_encoders['recommended_structure'] = structure_le

            # 2. Runoff model
            X_runoff = []
            y_runoff = []
            coeffs = {'Concrete': 0.85, 'Tiled': 0.75, 'Metal': 0.90, 'Asbestos': 0.80, 'Thatched': 0.60, 'Plastic': 0.85, 'Other': 0.70}
            for rt_idx, rt in enumerate(roof_types):
                for age in range(0, 50, 5):
                    for reg in [0, 1]:
                        c = coeffs.get(rt, 0.7) * max(0.7, 1 - age * 0.008)
                        X_runoff.append([rt_idx, age, reg])
                        y_runoff.append(c)
            runoff_rf = RandomForestRegressor(n_estimators=30, random_state=42)
            runoff_rf.fit(X_runoff, y_runoff)
            self.runoff_model = runoff_rf

            # 3. Structure model
            X_struct = []
            y_struct = []
            for area in [20, 50, 100, 200]:
                for open_sp in [10, 30, 60, 100]:
                    for s_idx, s_type in enumerate(soil_types):
                        for a_idx in range(len(aquifer_types)):
                            for depth in [5, 15, 30]:
                                if open_sp >= 50 and s_type in ['Sandy', 'Sandy Loam']:
                                    idx = 3 # Recharge_Shaft
                                elif open_sp >= 20 and s_type in ['Sandy', 'Sandy Loam']:
                                    idx = 1 # Recharge_Pit
                                elif open_sp >= 20:
                                    idx = 2 # Recharge_Trench
                                else:
                                    idx = 0 # Storage_Tank
                                X_struct.append([area, open_sp, s_idx, a_idx, depth])
                                y_struct.append(idx)
            struct_rf = RandomForestClassifier(n_estimators=30, random_state=42)
            struct_rf.fit(X_struct, y_struct)
            self.structure_model = struct_rf

            # 4. Harvest model
            X_harv = []
            y_harv = []
            for open_sp in [10, 50, 100]:
                for rc in [0.5, 0.7, 0.9]:
                    for rain in [500, 1000, 1500]:
                        for rt_idx in range(len(roof_types)):
                            X_harv.append([open_sp, rc, rain, rt_idx])
                            y_harv.append(open_sp * rain * rc * 0.8)
            harv_rf = RandomForestRegressor(n_estimators=30, random_state=42)
            harv_rf.fit(X_harv, y_harv)
            self.harvest_model = harv_rf

            # 5. Cost model
            X_cost = []
            y_cost = []
            cost_map = {0: 150, 1: 200, 2: 250, 3: 300}
            for st_idx in range(4):
                for area in [20, 50, 100, 200]:
                    for reg in [0, 1]:
                        mult = 1.2 if reg == 1 else 1.0
                        c = area * cost_map.get(st_idx, 200) * mult
                        pb = c / max(1, area * 700)
                        X_cost.append([st_idx, area, reg])
                        y_cost.append([c, max(1.0, pb)])
            cost_rf = RandomForestRegressor(n_estimators=30, random_state=42)
            cost_rf.fit(X_cost, y_cost)
            self.cost_model = cost_rf

            # Save generated models so subsequent loads work fast
            joblib.dump(self.runoff_model, os.path.join(base_dir, 'runoff_model.pkl'))
            joblib.dump(self.label_encoders['roof_type'], os.path.join(base_dir, 'roof_type_encoder.pkl'))
            joblib.dump(self.structure_model, os.path.join(base_dir, 'structure_model.pkl'))
            joblib.dump(self.label_encoders['soil_type'], os.path.join(base_dir, 'soil_type_encoder.pkl'))
            joblib.dump(self.label_encoders['aquifer_type'], os.path.join(base_dir, 'aquifer_type_encoder.pkl'))
            joblib.dump(self.harvest_model, os.path.join(base_dir, 'harvest_model.pkl'))
            joblib.dump(self.cost_model, os.path.join(base_dir, 'cost_model.pkl'))
            joblib.dump(self.label_encoders['recommended_structure'], os.path.join(base_dir, 'structure_encoder.pkl'))

            self.models_loaded = True
            print("ML models auto-trained and loaded successfully!")
        except Exception as err:
            import traceback
            print(f"Fallback model training failed: {err}. Traceback: {traceback.format_exc()}")
            self.models_loaded = False
    
    def predict_runoff_coefficient(self, roof_type: str, roof_age: int, region: str):
        """Predict runoff coefficient"""
        try:
            if self.runoff_model:
                # Encode categorical features
                roof_type_encoded = self.label_encoders['roof_type'].transform([roof_type])[0]
                
                # Create feature array
                features = np.array([[roof_type_encoded, roof_age, 1 if region == "urban" else 0]])
                
                # Predict
                runoff_coeff = self.runoff_model.predict(features)[0]
                return max(0.3, min(0.95, runoff_coeff))  # Ensure reasonable range
            else:
                # Fallback to rule-based
                return self._fallback_runoff_coefficient(roof_type, roof_age)
                
        except Exception as e:
            print(f"Runoff prediction error: {e}")
            return self._fallback_runoff_coefficient(roof_type, roof_age)
    
    def predict_structure(self, roof_area: float, open_space: float, 
                         soil_type: str, aquifer_type: str, water_depth: float):
        """Recommend RWH structure"""
        try:
            if self.structure_model:
                # Encode categorical features
                soil_encoded = self.label_encoders['soil_type'].transform([soil_type])[0]
                aquifer_encoded = self.label_encoders['aquifer_type'].transform([aquifer_type])[0]
                
                # Create feature array
                features = np.array([[roof_area, open_space, soil_encoded, aquifer_encoded, water_depth]])
                
                # Predict
                structure_idx = self.structure_model.predict(features)[0]
                structures = ["Storage_Tank", "Recharge_Pit", "Recharge_Trench", "Recharge_Shaft"]
                return structures[structure_idx]
            else:
                return self._fallback_structure_recommendation(roof_area, open_space, soil_type, water_depth)
                
        except Exception as e:
            print(f"Structure prediction error: {e}")
            return self._fallback_structure_recommendation(roof_area, open_space, soil_type, water_depth)
    
    def predict_water_harvest(self, open_space: float, runoff_coeff: float, 
                             annual_rainfall: float, roof_type: str):
        """Predict harvestable water"""
        try:
            if self.harvest_model:
                # Use roof_type as additional feature (encoded)
                roof_type_encoded = self.label_encoders['roof_type'].transform([roof_type])[0]
                
                features = np.array([[open_space, runoff_coeff, annual_rainfall, roof_type_encoded]])
                harvest = self.harvest_model.predict(features)[0]
                return max(0, harvest)
            else:
                return self._fallback_water_harvest(open_space, runoff_coeff, annual_rainfall)
                
        except Exception as e:
            print(f"Harvest prediction error: {e}")
            return self._fallback_water_harvest(open_space, runoff_coeff, annual_rainfall)
    
    def predict_cost_benefit(self, structure_type: str, roof_area: float, region: str = "urban"):
        """Predict costs and payback period"""
        try:
            if self.cost_model:
                # Encode structure type
                structure_encoded = self.label_encoders['recommended_structure'].transform([structure_type])[0]
                region_encoded = 1 if region == "urban" else 0
                
                features = np.array([[structure_encoded, roof_area, region_encoded]])
                prediction = self.cost_model.predict(features)[0]
                
                return {
                    'installation_cost': max(10000, prediction[0]),
                    'payback_period': max(1, prediction[1])
                }
            else:
                return self._fallback_cost_benefit(structure_type, roof_area, region)
                
        except Exception as e:
            print(f"Cost prediction error: {e}")
            return self._fallback_cost_benefit(structure_type, roof_area, region)
    
    # Fallback methods (rule-based)
    def _fallback_runoff_coefficient(self, roof_type: str, roof_age: int):
        coefficients = {
            'Concrete': 0.8, 'Tiled': 0.7, 'Metal': 0.9, 
            'Asbestos': 0.8, 'Thatched': 0.6, 'Plastic': 0.85
        }
        base_coeff = coefficients.get(roof_type, 0.7)
        # Adjust for roof age
        age_factor = max(0.7, 1 - (roof_age * 0.01))
        return base_coeff * age_factor
    
    def _fallback_structure_recommendation(self, roof_area: float, open_space: float, 
                                         soil_type: str, water_depth: float):
        if open_space >= 50 and soil_type in ['Sandy', 'Sandy Loam']:
            return "Recharge_Shaft"
        elif open_space >= 20:
            return "Recharge_Pit" if soil_type in ['Sandy', 'Sandy Loam'] else "Recharge_Trench"
        elif roof_area >= 50:
            return "Storage_Tank"
        else:
            return "Storage_Tank"
    
    def _fallback_water_harvest(self, roof_area: float, runoff_coeff: float, annual_rainfall: float):
        return roof_area * annual_rainfall * runoff_coeff
    
    def _fallback_cost_benefit(self, structure_type: str, roof_area: float, region: str):
        cost_factors = {
            'Storage_Tank': 150, 'Recharge_Pit': 200, 
            'Recharge_Trench': 250, 'Recharge_Shaft': 300
        }
        region_multiplier = 1.2 if region == "urban" else 1.0
        
        installation_cost = roof_area * cost_factors.get(structure_type, 200) * region_multiplier
        annual_savings = roof_area * 1000 * 0.7  # Simplified calculation
        payback_period = installation_cost / annual_savings if annual_savings > 0 else 5
        
        return {
            'installation_cost': installation_cost,
            'payback_period': payback_period
        }

# Initialize the ML service
ml_service = MLModelService()