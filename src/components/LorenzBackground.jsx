import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LorenzBackground = ({ scrollPosition }) => { // <--- New Prop
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const cameraRef = useRef(null); // Keep track of camera

  // Geometry Helper (Manual definition to fix the "not a constructor" error)
  const createMobiusStrip = () => {
    const geometry = new THREE.BufferGeometry();
    const slices = 100; 
    const stacks = 20;
    const vertices = [];
    const indices = [];

    for (let i = 0; i <= slices; i++) {
      const u = (i / slices) * Math.PI * 2;
      for (let j = 0; j <= stacks; j++) {
        const v = (j / stacks) * 2 - 1; 
        const R = 200; 
        const w = 60;  
        const x = (R + w * v * Math.cos(u / 2)) * Math.cos(u);
        const y = (R + w * v * Math.cos(u / 2)) * Math.sin(u);
        const z = w * v * Math.sin(u / 2);
        vertices.push(x, y, z);
      }
    }

    for (let i = 0; i < slices; i++) {
      for (let j = 0; j < stacks; j++) {
        const a = i * (stacks + 1) + j;
        const b = (i + 1) * (stacks + 1) + j;
        const c = i * (stacks + 1) + (j + 1);
        const d = (i + 1) * (stacks + 1) + (j + 1);
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.5, // Good visibility
      side: THREE.DoubleSide 
    });

    return new THREE.Mesh(geometry, material);
  };

  // CAMERA UPDATE EFFECT (The "Flying" Logic)
  useEffect(() => {
    if (cameraRef.current) {
      // Start at 550. As we scroll, subtract the scrollPosition to move closer.
      // We limit it so you don't fly PAST the object (min 50).
      const targetZ = 550 - (scrollPosition * 0.5); 
      cameraRef.current.position.z = Math.max(50, targetZ);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // No background color needed (transparent)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 550);
    cameraRef.current = camera; // Save ref

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const mobius = createMobiusStrip();
    scene.add(mobius);
    meshRef.current = mobius;

    const animate = () => {
      requestAnimationFrame(animate);
      if (meshRef.current) {
        // Always drift slowly
        meshRef.current.rotation.y += 0.0005;
        meshRef.current.rotation.x += 0.0002;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default LorenzBackground;