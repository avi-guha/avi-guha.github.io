import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ScrollParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show particles after scrolling past hero section (roughly 100vh)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // Fewer particles for subtlety
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    // Particle material - theme aware
    const getParticleColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 0x60a5fa : 0x3b82f6; // blue-400 for dark mode, blue-500 for light
    };

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: getParticleColor(),
      transparent: true,
      opacity: 0.5, // Increased opacity
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create connecting lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: getParticleColor(),
      transparent: true,
      opacity: 0.12, // Increased line opacity
      blending: THREE.AdditiveBlending,
    });

    const positions = particlesGeometry.attributes.position.array;
    const linePositions: number[] = [];

    // Connect nearby particles
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 10) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }

    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Theme observer to update colors
    const observer = new MutationObserver(() => {
      const newColor = getParticleColor();
      particlesMaterial.color.setHex(newColor);
      linesMaterial.color.setHex(newColor);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animation
    let scrollOffset = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Get scroll position
      const newScrollOffset = window.scrollY * 0.0003;
      scrollOffset = newScrollOffset;

      // Rotate particles based on scroll
      particlesMesh.rotation.y = scrollOffset;
      particlesMesh.rotation.x = scrollOffset * 0.5;
      linesMesh.rotation.y = scrollOffset;
      linesMesh.rotation.x = scrollOffset * 0.5;

      // Subtle mouse parallax effect
      camera.position.x += (mouseX * 1 - camera.position.x) * 0.005;
      camera.position.y += (mouseY * 1 - camera.position.y) * 0.005;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
