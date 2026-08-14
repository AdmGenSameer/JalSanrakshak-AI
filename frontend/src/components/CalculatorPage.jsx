import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button
} from '@mui/material';
import UserInputForm from './UserInputForm';
import GoogleEarthLink from './GoogleEarthLink';
import SplashScreen from './SplashScreen';
import * as THREE from 'three';

const CalculatorPage = () => {
  const [calculating, setCalculating] = useState(false);
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);

  // Handle calculation and show splash screen
  const handleCalculationStart = () => {
    setCalculating(true);
    
    // Simulate calculation time with splash screen
    setTimeout(() => {
      setCalculating(false);
    }, 3000); // 3 seconds splash screen
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      threeContainerRef.current.clientWidth,
      threeContainerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    threeContainerRef.current.appendChild(renderer.domElement);
    
    // House/building
    const buildingGeometry = new THREE.BoxGeometry(4, 3, 3);
    const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeff });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(0, 1.5, 0);
    scene.add(building);
    
    // Roof
    const roofGeometry = new THREE.ConeGeometry(3, 1.5, 4);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0xff7043 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 3.75, 0);
    roof.rotation.y = Math.PI / 4;
    scene.add(roof);
    
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x91a56d, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);
    
    // Tree
    const treeTrunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2);
    const treeTrunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
    treeTrunk.position.set(3, 1, 3);
    scene.add(treeTrunk);
    
    // Tree leaves
    const treeLeafGeometry = new THREE.SphereGeometry(1, 16, 16);
    const treeLeafMaterial = new THREE.MeshLambertMaterial({ color: 0x548235 });
    const treeLeaf = new THREE.Mesh(treeLeafGeometry, treeLeafMaterial);
    treeLeaf.position.set(3, 2.5, 3);
    scene.add(treeLeaf);
    
    // Create clouds and raindrops
    const clouds = new THREE.Group();
    scene.add(clouds);
    
    // Create several cloud puffs
    for (let i = 0; i < 5; i++) {
      const cloudGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const cloudMaterial = new THREE.MeshLambertMaterial({ color: 0xf0f0f0 });
      const cloudPuff = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloudPuff.position.set(-4 + i * 0.7, 8, -3 + Math.random() * 2);
      clouds.add(cloudPuff);
    }
    
    // Create raindrops
    const raindrops = [];
    const raindropGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const raindropMaterial = new THREE.MeshLambertMaterial({ color: 0x72bcd4 });
    
    for (let i = 0; i < 40; i++) {
      const raindrop = new THREE.Mesh(raindropGeometry, raindropMaterial);
      raindrop.position.set(
        -5 + Math.random() * 10,
        10 - Math.random() * 5,
        -5 + Math.random() * 10
      );
      raindrop.userData = {
        velocity: 0.05 + Math.random() * 0.1,
        active: true,
      };
      scene.add(raindrop);
      raindrops.push(raindrop);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 2, 0);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate cloud movement
      clouds.position.x += 0.01;
      if (clouds.position.x > 10) clouds.position.x = -10;
      
      // Animate raindrops
      raindrops.forEach(raindrop => {
        raindrop.position.y -= raindrop.userData.velocity;
        
        // Reset raindrop when it reaches the ground or roof
        if (raindrop.position.y < 0) {
          // Reposition at the top
          raindrop.position.y = 10 - Math.random() * 2;
          raindrop.position.x = -5 + Math.random() * 10;
          raindrop.position.z = -5 + Math.random() * 10;
        }
        
        // Make raindrops "disappear" when they hit the roof
        if (raindrop.position.y < 3.75 && 
            Math.abs(raindrop.position.x) < 2 && 
            Math.abs(raindrop.position.z) < 2) {
          raindrop.position.y = 10 - Math.random() * 2;
          raindrop.position.x = -5 + Math.random() * 10;
          raindrop.position.z = -5 + Math.random() * 10;
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Store scene reference for cleanup
    sceneRef.current = { scene, renderer };
    
    // Handle window resize
    const handleResize = () => {
      if (!threeContainerRef.current) return;
      
      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        threeContainerRef.current.clientWidth,
        threeContainerRef.current.clientHeight
      );
    };
    
    window.addEventListener('resize', handleResize);
    
    // Store container reference for cleanup
    const threeContainer = threeContainerRef.current;
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeContainer && renderer.domElement) {
        threeContainer.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      {/* Splash screen overlay when calculating */}
      {calculating && <SplashScreen message="Calculating your rainwater harvesting potential..." />}

      <Grid container spacing={3} sx={{ minHeight: '90vh' }}>
        {/* Form Section - Left Half */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Calculate Your Rainwater Harvesting Potential
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Fill in your details below to get a personalized assessment of your
              rainwater harvesting potential, estimated costs, and environmental impact.
            </Typography>
            
            {/* User Input Form with event handler for calculation start */}
            <UserInputForm onCalculationStart={handleCalculationStart} />
            
            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Need help measuring your roof area?
              </Typography>
              <GoogleEarthLink />
            </Box>
          </Paper>
        </Grid>
        
        {/* Animation Section - Right Half */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '100%',
              minHeight: '70vh',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            {/* Three.js Container */}
            <Box
              ref={threeContainerRef}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: '70vh',
                bgcolor: '#e0f7fa'
              }}
            />
            
            {/* Overlay text */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                p: 3,
                bgcolor: 'rgba(255,255,255,0.8)',
                borderTop: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Rainwater Harvesting Visualization
              </Typography>
              <Typography variant="body2">
                The animation shows how rainwater can be collected from your roof,
                stored for use, and help recharge groundwater to support vegetation.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalculatorPage;
