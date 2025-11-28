import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LoadingAnimationProps {
  onComplete: () => void;
}

// Check if WebGL is available
const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Non-linear easing function for more natural progress
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

// Simulate realistic loading with random jumps
const simulateProgress = (elapsed: number, duration: number): number => {
  const baseProgress = elapsed / duration;
  // Add some randomness to make it feel more natural
  const wobble = Math.sin(elapsed * 0.01) * 0.02;
  // Apply easing
  const eased = easeOutExpo(Math.min(baseProgress, 1));
  return Math.min(eased + wobble * (1 - eased), 1);
};

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [webglSupported] = useState(isWebGLAvailable);

  // Fallback animation for non-WebGL browsers
  useEffect(() => {
    if (webglSupported) return;

    const duration = 2500;
    const startTime = Date.now();

    const animateFallback = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = simulateProgress(elapsed, duration);
      setProgress(currentProgress);

      if (currentProgress >= 1) {
        setTimeout(() => {
          onComplete();
        }, 200);
        return;
      }

      requestAnimationFrame(animateFallback);
    };

    animateFallback();
  }, [onComplete, webglSupported]);

  // WebGL animation
  useEffect(() => {
    if (!containerRef.current || !webglSupported) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0a0a0a);
    containerRef.current.appendChild(renderer.domElement);

    // Create atom nucleus (protons and neutrons)
    const nucleusGroup = new THREE.Group();
    const nucleonGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    
    // Protons (red)
    const protonMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff4444,
      emissive: 0x330000,
      shininess: 100 
    });
    
    // Neutrons (gray)
    const neutronMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x888888,
      emissive: 0x222222,
      shininess: 100 
    });

    // Create nucleus with 6 protons and 6 neutrons (Carbon-12)
    const nucleonPositions = [
      [0, 0, 0], [0.8, 0, 0], [-0.8, 0, 0],
      [0, 0.8, 0], [0, -0.8, 0], [0, 0, 0.8],
      [0, 0, -0.8], [0.6, 0.6, 0], [-0.6, -0.6, 0],
      [0.6, -0.6, 0], [-0.6, 0.6, 0], [0, 0.6, 0.6]
    ];

    nucleonPositions.forEach((pos, i) => {
      const nucleon = new THREE.Mesh(
        nucleonGeometry, 
        i < 6 ? protonMaterial : neutronMaterial
      );
      nucleon.position.set(pos[0], pos[1], pos[2]);
      nucleusGroup.add(nucleon);
    });

    scene.add(nucleusGroup);

    // Create electron orbitals
    const orbitalGroup = new THREE.Group();
    
    // Electron geometry
    const electronGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const electronMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4466ff,
      emissive: 0x001144,
      shininess: 100 
    });

    // Orbital paths (torus for visual guide)
    const orbitalRings: THREE.Mesh[] = [];
    
    const createOrbital = (radius: number, rotation: [number, number, number]) => {
      const orbitalGeometry = new THREE.TorusGeometry(radius, 0.02, 8, 64);
      const orbitalMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3344aa,
        transparent: true,
        opacity: 0.3 
      });
      const orbital = new THREE.Mesh(orbitalGeometry, orbitalMaterial);
      orbital.rotation.set(rotation[0], rotation[1], rotation[2]);
      return orbital;
    };

    const orbital1 = createOrbital(3, [Math.PI / 2, 0, 0]);
    const orbital2 = createOrbital(4, [Math.PI / 2, Math.PI / 3, 0]);
    const orbital3 = createOrbital(5, [Math.PI / 2, -Math.PI / 4, Math.PI / 6]);
    
    orbitalRings.push(orbital1, orbital2, orbital3);
    orbitalGroup.add(orbital1, orbital2, orbital3);
    scene.add(orbitalGroup);

    // Create electrons with orbital reference
    const electrons: { 
      mesh: THREE.Mesh; 
      orbital: THREE.Mesh;
      angle: number; 
      speed: number;
    }[] = [];
    
    const createElectron = (
      orbitalMesh: THREE.Mesh,
      speed: number
    ) => {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electrons.push({
        mesh: electron,
        orbital: orbitalMesh,
        angle: Math.random() * Math.PI * 2,
        speed
      });
      scene.add(electron);
    };

    // Create electrons on each orbital
    createElectron(orbital1, 0.02);
    createElectron(orbital1, 0.02);
    createElectron(orbital2, 0.015);
    createElectron(orbital2, 0.015);
    createElectron(orbital3, 0.01);
    createElectron(orbital3, 0.01);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4466ff, 0.5, 100);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    // Particle field for quantum effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x6688ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation state
    let time = 0;
    const duration = 3000; // 3 seconds
    const startTime = Date.now();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = simulateProgress(elapsed, duration);
      setProgress(currentProgress);

      if (currentProgress >= 1) {
        setTimeout(() => {
          onComplete();
        }, 200);
      }

      time += 0.01;

      // Rotate nucleus
      nucleusGroup.rotation.x = time * 0.3;
      nucleusGroup.rotation.y = time * 0.5;

      // Scale nucleus with pulse
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      nucleusGroup.scale.set(pulse, pulse, pulse);

      // Rotate orbitals
      orbitalGroup.rotation.y = time * 0.2;

      // Animate electrons in orbit - follow exact ring path
      electrons.forEach((electron) => {
        electron.angle += electron.speed;
        
        // Get the orbital ring's geometry to extract radius
        const orbitalGeom = electron.orbital.geometry as THREE.TorusGeometry;
        const radius = orbitalGeom.parameters.radius;
        
        // Calculate position on circle in local space
        const localPos = new THREE.Vector3(
          Math.cos(electron.angle) * radius,
          Math.sin(electron.angle) * radius,
          0
        );
        
        // Apply the orbital ring's rotation to get world position
        localPos.applyEuler(electron.orbital.rotation);
        
        // Apply the orbital group's rotation
        localPos.applyEuler(orbitalGroup.rotation);
        
        electron.mesh.position.copy(localPos);
      });

      // Rotate particle field
      particlesMesh.rotation.y = time * 0.05;

      // Camera zoom in effect
      camera.position.z = 15 - currentProgress * 3;

      renderer.render(scene, camera);

      if (currentProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      nucleonGeometry.dispose();
      protonMaterial.dispose();
      neutronMaterial.dispose();
      electronGeometry.dispose();
      electronMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onComplete, webglSupported]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {webglSupported && <div ref={containerRef} className="absolute inset-0" />}
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Avi Guha
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Engineering Physics
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground/60">
          {Math.floor(progress * 100)}%
        </p>
      </div>
    </div>
  );
}
