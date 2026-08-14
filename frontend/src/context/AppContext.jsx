import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  user_data: {
    name: "",
    location: "",
    dwellers: 4,
    roof_area: 100,
    open_space: 50,
    roof_type: "Concrete",
    soil_type: "Loamy",
    roof_age: 5,
    assessment_id: null,
    results: null,
    latitude: null,
    longitude: null
  },
  calculation_done: false,
  loading: false,
  error: null
};

// Action types
const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  UPDATE_USER_FIELD: 'UPDATE_USER_FIELD',
  SET_CALCULATION_DONE: 'SET_CALCULATION_DONE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return {
        ...state,
        user_data: { ...state.user_data, ...action.payload }
      };
    case ActionTypes.UPDATE_USER_FIELD:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          [action.field]: action.value
        }
      };
    case ActionTypes.SET_CALCULATION_DONE:
      return {
        ...state,
        calculation_done: action.payload
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUserData: (data) => dispatch({ type: ActionTypes.SET_USER_DATA, payload: data }),
    updateUserField: (field, value) => dispatch({ type: ActionTypes.UPDATE_USER_FIELD, field, value }),
    setCalculationDone: (done) => dispatch({ type: ActionTypes.SET_CALCULATION_DONE, payload: done }),
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    resetState: () => dispatch({ type: ActionTypes.RESET_STATE })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
