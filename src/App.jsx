import React, { useState } from 'react';
import bgVideo from './From Main Klickpin CF- Jay Sri Ram - 5J3xdmxNk.mp4';
import ContentOverlay from './components/PremiumLMSOverlay';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40; // shift up to 20px
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  return (
    <div onMouseMove={handleMouseMove} className="w-screen h-screen bg-[#050308] overflow-hidden relative isolate !p-0 !m-0 left-0 top-0">
      {/* Interactive Video Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none !p-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '110vh',     /* When rotated 90deg, width acts as height for the screen */
            height: '110vw',    /* When rotated 90deg, height acts as width for the screen */
            objectFit: 'cover',
            /* Important: translate must happen first to center it BEFORE rotating */
            transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px)) rotate(-90deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          src={bgVideo}
        />
      </div>

      {/* Content Layer Overlay on top of the video */}
      <ContentOverlay />

    </div>
  );
}
