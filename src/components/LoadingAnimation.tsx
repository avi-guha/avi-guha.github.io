import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

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
    
    orbitalGroup.add(orbital1, orbital2, orbital3);
    scene.add(orbitalGroup);

    // Create electrons with orbital plane info
    const electrons: { 
      mesh: THREE.Mesh; 
      orbit: number; 
      angle: number; 
      speed: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
    }[] = [];
    
    const createElectron = (
      orbitRadius: number, 
      speed: number,
      rotationX: number,
      rotationY: number,
      rotationZ: number
    ) => {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electrons.push({
        mesh: electron,
        orbit: orbitRadius,
        angle: Math.random() * Math.PI * 2,
        speed,
        rotationX,
        rotationY,
        rotationZ
      });
      scene.add(electron);
    };

    // Match orbital rotations
    createElectron(3, 0.02, Math.PI / 2, 0, 0);
    createElectron(3, 0.02, Math.PI / 2, 0, 0);
    createElectron(4, 0.015, Math.PI / 2, Math.PI / 3, 0);
    createElectron(4, 0.015, Math.PI / 2, Math.PI / 3, 0);
    createElectron(5, 0.01, Math.PI / 2, -Math.PI / 4, Math.PI / 6);
    createElectron(5, 0.01, Math.PI / 2, -Math.PI / 4, Math.PI / 6);

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
      const currentProgress = Math.min(elapsed / duration, 1);
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

      // Animate electrons in orbit
      electrons.forEach((electron) => {
        electron.angle += electron.speed;
        
        // Calculate position on circular orbit
        const x = Math.cos(electron.angle) * electron.orbit;
        const y = Math.sin(electron.angle) * electron.orbit;
        const z = 0;
        
        // Create rotation matrix to match orbital plane
        const position = new THREE.Vector3(x, y, z);
        
        // Apply rotations in the same order as the orbital rings
        position.applyAxisAngle(new THREE.Vector3(1, 0, 0), electron.rotationX);
        position.applyAxisAngle(new THREE.Vector3(0, 1, 0), electron.rotationY);
        position.applyAxisAngle(new THREE.Vector3(0, 0, 1), electron.rotationZ);
        
        electron.mesh.position.copy(position);
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
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <div ref={containerRef} className="absolute inset-0" />
      
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
