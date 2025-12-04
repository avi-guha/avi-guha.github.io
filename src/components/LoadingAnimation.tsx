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
  const wobble = Math.sin(elapsed * 0.01) * 0.02;
  const eased = easeOutExpo(Math.min(baseProgress, 1));
  return Math.min(eased + wobble * (1 - eased), 1);
};

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [webglSupported] = useState(isWebGLAvailable);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Handle fade out completion
  const handleFadeOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 800); // Match the CSS transition duration
  };

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
          handleFadeOut();
        }, 200);
        return;
      }

      requestAnimationFrame(animateFallback);
    };

    animateFallback();
  }, [onComplete, webglSupported]);

  // WebGL animation - 3D Atom Model
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
    camera.position.z = 18;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0f);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Create atom group (nucleus + orbitals)
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Create nucleus as a collection of red and orange spheres (protons and neutrons)
    const nucleusGroup = new THREE.Group();
    atomGroup.add(nucleusGroup);

    // Nucleon radius - larger spheres
    const nucleonRadius = 0.55;
    // Distance between centers so edges just touch (2 * radius = diameter, slight overlap for realism)
    const touchDistance = nucleonRadius * 1.9;

    // 15 nucleons arranged symmetrically - center + octahedral + all 8 cubic corners
    const nucleonPositions = [
      // Center nucleon
      { pos: [0, 0, 0], color: 0xef4444 },                                    // Red (proton)
      // 6 surrounding in octahedral arrangement (along axes)
      { pos: [touchDistance, 0, 0], color: 0xf97316 },                        // Orange (neutron)
      { pos: [-touchDistance, 0, 0], color: 0xf97316 },                       // Orange
      { pos: [0, touchDistance, 0], color: 0xef4444 },                        // Red
      { pos: [0, -touchDistance, 0], color: 0xef4444 },                       // Red
      { pos: [0, 0, touchDistance], color: 0xf97316 },                        // Orange
      { pos: [0, 0, -touchDistance], color: 0xf97316 },                       // Orange
      // 8 in cubic corners (all diagonal positions for full symmetry)
      { pos: [touchDistance * 0.6, touchDistance * 0.6, touchDistance * 0.6], color: 0xef4444 },      // Red
      { pos: [-touchDistance * 0.6, -touchDistance * 0.6, -touchDistance * 0.6], color: 0xef4444 },   // Red
      { pos: [touchDistance * 0.6, -touchDistance * 0.6, touchDistance * 0.6], color: 0xf97316 },     // Orange
      { pos: [-touchDistance * 0.6, touchDistance * 0.6, -touchDistance * 0.6], color: 0xf97316 },    // Orange
      { pos: [-touchDistance * 0.6, touchDistance * 0.6, touchDistance * 0.6], color: 0xef4444 },     // Red
      { pos: [touchDistance * 0.6, -touchDistance * 0.6, -touchDistance * 0.6], color: 0xef4444 },    // Red
      { pos: [touchDistance * 0.6, touchDistance * 0.6, -touchDistance * 0.6], color: 0xf97316 },     // Orange
      { pos: [-touchDistance * 0.6, -touchDistance * 0.6, touchDistance * 0.6], color: 0xf97316 },    // Orange
    ];

    const nucleonGeometry = new THREE.SphereGeometry(nucleonRadius, 32, 32);
    const nucleons: THREE.Mesh[] = [];

    nucleonPositions.forEach(({ pos, color }) => {
      const nucleonMaterial = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.15,
        shininess: 120,
        specular: 0xffffff,
      });
      const nucleon = new THREE.Mesh(nucleonGeometry, nucleonMaterial);
      nucleon.position.set(pos[0], pos[1], pos[2]);
      nucleon.castShadow = true;
      nucleons.push(nucleon);
      nucleusGroup.add(nucleon);
    });

    // Orbital ring configurations - metallic silver/gray like the image
    interface OrbitalConfig {
      radius: number;
      rotation: THREE.Euler;
      electrons: { color: number; startAngle: number }[];
    }

    const orbitalConfigs: OrbitalConfig[] = [
      {
        radius: 5,
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
        electrons: [
          { color: 0x3b82f6, startAngle: 0 },           // Blue
          { color: 0x3b82f6, startAngle: Math.PI },     // Blue
        ]
      },
      {
        radius: 5.5,
        rotation: new THREE.Euler(Math.PI / 2, Math.PI / 3, Math.PI / 6),
        electrons: [
          { color: 0x3b82f6, startAngle: Math.PI / 2 },  // Blue
          { color: 0x3b82f6, startAngle: -Math.PI / 2 }, // Blue
        ]
      },
      {
        radius: 6,
        rotation: new THREE.Euler(Math.PI / 2, -Math.PI / 4, -Math.PI / 6),
        electrons: [
          { color: 0x3b82f6, startAngle: Math.PI / 4 },   // Blue
          { color: 0x3b82f6, startAngle: -Math.PI * 0.75 }, // Blue
        ]
      },
      {
        radius: 5.2,
        rotation: new THREE.Euler(Math.PI / 3, Math.PI / 2, 0),
        electrons: [
          { color: 0x3b82f6, startAngle: 0 }, // Blue
        ]
      },
    ];

    // Create orbital rings - metallic silver appearance
    const orbitals: THREE.Mesh[] = [];
    
    orbitalConfigs.forEach((config) => {
      // Main orbital ring - thicker like in the image
      const ringGeometry = new THREE.TorusGeometry(config.radius, 0.08, 16, 100);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x9ca3af,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x374151,
        emissiveIntensity: 0.1,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.copy(config.rotation);
      ring.castShadow = true;
      orbitals.push(ring);
      atomGroup.add(ring);
    });

    // Electron spheres
    interface Electron {
      mesh: THREE.Mesh;
      orbitalIndex: number;
      angle: number;
      speed: number;
      radius: number;
      rotation: THREE.Euler;
    }

    const electrons: Electron[] = [];

    orbitalConfigs.forEach((config, orbitalIndex) => {
      config.electrons.forEach((electronConfig) => {
        const electronGeometry = new THREE.SphereGeometry(0.45, 32, 32);
        const electronMaterial = new THREE.MeshPhongMaterial({
          color: electronConfig.color,
          emissive: electronConfig.color,
          emissiveIntensity: 0.3,
          shininess: 100,
          specular: 0xffffff,
        });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        electron.castShadow = true;

        electrons.push({
          mesh: electron,
          orbitalIndex,
          angle: electronConfig.startAngle,
          speed: 0.006 + Math.random() * 0.003,
          radius: config.radius,
          rotation: config.rotation.clone(),
        });

        scene.add(electron);
      });
    });

    // Background particle field for depth
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting setup for realistic rendering
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 1, 30);
    blueRimLight.position.set(-8, 0, 8);
    scene.add(blueRimLight);

    const warmLight = new THREE.PointLight(0xfbbf24, 0.5, 25);
    warmLight.position.set(8, -5, 5);
    scene.add(warmLight);

    // Animation state
    let time = 0;
    const duration = 3000;
    const startTime = Date.now();
    let animationId: number;

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Track if fade has started
    let fadeStarted = false;

    // Animation loop
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = simulateProgress(elapsed, duration);
      setProgress(currentProgress);

      if (currentProgress >= 1 && !fadeStarted) {
        fadeStarted = true;
        setTimeout(() => {
          handleFadeOut();
        }, 200);
      }

      time += 0.016;

      // Nucleus subtle pulse and slow rotation
      const pulse = 1 + Math.sin(time * 1.5) * 0.03;
      nucleusGroup.scale.set(pulse, pulse, pulse);
      nucleusGroup.rotation.y += 0.005;
      nucleusGroup.rotation.x += 0.002;

      // Rotate orbital rings around the nucleus on multiple axes
      const ringRotations = [
        { x: 0.002, y: 0.003, z: 0.001 },
        { x: -0.001, y: -0.002, z: 0.0015 },
        { x: 0.0015, y: 0.001, z: -0.002 },
        { x: -0.0012, y: 0.0018, z: 0.001 },
      ];
      orbitals.forEach((ring, index) => {
        const rot = ringRotations[index % ringRotations.length];
        ring.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), rot.x);
        ring.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rot.y);
        ring.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), rot.z);
      });

      // Animate electrons along their orbital paths, staying on their rings
      electrons.forEach((electron) => {
        electron.angle += electron.speed;

        // Calculate position on the orbital ring (in ring's local 2D plane)
        const x = Math.cos(electron.angle) * electron.radius;
        const y = Math.sin(electron.angle) * electron.radius;

        // Create position vector in ring's local space
        const pos = new THREE.Vector3(x, y, 0);
        
        // Get the current rotation of the orbital ring this electron belongs to
        const orbitalRing = orbitals[electron.orbitalIndex];
        
        // Apply the orbital ring's current world rotation
        const quaternion = new THREE.Quaternion();
        quaternion.setFromEuler(orbitalRing.rotation);
        pos.applyQuaternion(quaternion);

        electron.mesh.position.copy(pos);
      });

      // Background particles (static)

      // Camera zoom as loading progresses
      camera.position.z = 18 - Math.min(currentProgress, 1) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      // Continue animation during fade out for smooth transition
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      nucleonGeometry.dispose();
      nucleons.forEach(nucleon => {
        (nucleon.material as THREE.Material).dispose();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      orbitals.forEach(orbital => {
        orbital.geometry.dispose();
        (orbital.material as THREE.Material).dispose();
      });
      electrons.forEach(electron => {
        electron.mesh.geometry.dispose();
        (electron.mesh.material as THREE.Material).dispose();
      });
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onComplete, webglSupported]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between py-16">
      {/* Black fade overlay */}
      <div 
        className={`absolute inset-0 bg-black z-30 transition-opacity duration-700 ease-out pointer-events-none ${
          isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {webglSupported && <div ref={containerRef} className="absolute inset-0" />}
      
      {/* Name at top */}
      <div className={`relative z-10 text-center mt-8 transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
          Avi Guha
        </h1>
      </div>

      {/* Spacer for atom in center */}
      <div className="flex-1" />

      {/* Subtitle at bottom */}
      <div className={`relative z-10 text-center mb-8 transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
          Engineering Physics
        </p>
      </div>
    </div>
  );
}
