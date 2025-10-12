'use client';

import { useEffect, useRef, useState } from 'react';

// Declare types for vanta and THREE to avoid TypeScript errors
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect) {
      // Dynamically import THREE and VANTA libraries
      const loadVanta = async () => {
        // Load THREE.js first
        const THREE = await import('three');
        window.THREE = THREE;

        // Load VANTA CLOUDS2 effect
        const VANTA = await import('vanta/dist/vanta.clouds2.min.js');
        
        if (vantaRef.current) {
          const effect = (VANTA as any).default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            speed: 1.10,
            texturePath: '/gallery/noise.png'
          });
          setVantaEffect(effect);
        }
      };

      loadVanta();
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default VantaBackground;
