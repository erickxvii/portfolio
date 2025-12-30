import React, { useState, useEffect } from 'react';
import LorenzBackground from "./components/LorenzBackground";
import './App.css';

// 1. CONFIGURATION
const SECTION_DEPTH = 1000;

const SECTIONS = [
  { 
    id: 'hero', 
    type: 'hero', 
    title: 'I am', 
    subtitle: 'Erick Perez',
    note: '(Scroll up to enter)'
  },
  { 
    id: 'about', 
    title: 'About', 
    text: 'I study Mathematics and Computer Science at Fordham University with a strong focus on AI and learning systems. I’m currently based in New York, spending most of my time studying, building projects, and thinking deeply about intelligence—both natural and artificial. I’m especially interested in work at the intersection of theory, computation, and cognition. \n\n Some of my interests are:\n 1. Deep Reinforcement Learning & Neuro-Symbolic AI\n 2. Computer Vision, 3D Perception & State Estimation \n 3. Mathematics for ML (stochastic optimization & probability) \n\n Reach out—I’m always open to conversations, collaboration, and exchanging ideas.' 
  },
  { 
    id: 'projects', 
    title: 'Projects', 
    type: 'list', 
    items: ['Evolutionary Robotics', 'Deterministic Chaos', 'Neuro-Symbolic AI'] 
  },
  { 
    id: 'projects', 
    title: 'Current Project', 
    text: 'Building a multi-agent reinforcement learning environment for drone swarms.' 
  },
  { 
    id: 'contact', 
    title: 'Contact', 
    text: 'eperez109@fordham.edu' 
  }
];

const App = () => {
  const [scrollPos, setScrollPos] = useState(0);

  // 2. CALCULATE TOTAL DEPTH
  const totalDepth = SECTIONS.length * SECTION_DEPTH;

  // 3. VIRTUAL SCROLL LOGIC
  useEffect(() => {
    const handleWheel = (e) => {
      // const delta = e.deltaY * 0.45;  Speed multiplier
      if (!e.ctrlKey) {
        e.preventDefault();
      }

      // FIX 2: THE "SPEED LIMIT"
      // 20 was too slow. 100 is the "Goldilocks" zone.
      // It lets you scroll fast, but stops you from "teleporting" 1000px in one frame.
      const MAX_DELTA = 60; 
      
      // Multiplier: 1.0 is standard speed. 0.5 is half speed.
      let delta = e.deltaY * 0.3;
   
      
      setScrollPos(prev => {
        const newPos = prev + delta;
        return Math.max(0, Math.min(totalDepth, newPos));
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [totalDepth]);

  // 4. OPACITY HELPER
  const getOpacity = (start, peak, end) => {
    if (scrollPos < start) return 0;
    if (scrollPos > end) return 0;
    if (scrollPos < peak) return (scrollPos - start) / (peak - start);
    return (end - scrollPos) / (end - peak);
  };

  return (
    <div className="app-container">
      <LorenzBackground scrollPosition={(scrollPos / totalDepth) * 800} />
      <div className="tunnel-overlay" />
      
      <div className="content-wrapper">
        {SECTIONS.map((section, index) => {
          const start = index * SECTION_DEPTH;
          const end = start + SECTION_DEPTH;
          let opacity = 0;

          // HERO EXCEPTION: Starts visible, fades out
          if (index === 0) {
            const fadeOutStart = start + (SECTION_DEPTH * 0.4);
            if (scrollPos < fadeOutStart) {
              opacity = 1; 
            } else {
              opacity = (end - scrollPos) / (end - fadeOutStart);
            }
          } else {
            // NORMAL SECTIONS: Fade in -> visible -> fade out
            const peak = start + (SECTION_DEPTH * 0.2);
            opacity = getOpacity(start, peak, end);
          }

          opacity = Math.max(0, Math.min(1, opacity));
          const isVisible = opacity > 0;

          return (
            <div 
              key={section.id} 
              className="maze-section" 
              style={{ 
                opacity: opacity, 
                pointerEvents: isVisible ? 'auto' : 'none',
                transform: `scale(${0.8 + (opacity * 0.2)})` 
              }}
            >
              {section.type === 'hero' ? (
                <>
                  <header className="hero">
                    <h1 className="hero-title" style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
                      {section.title}
                    </h1>
                    <p className="hero-subtitle">{section.subtitle}</p>
                    <p className="hero-subtitle" style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.6 }}>
                      {section.note}
                    </p>

                    {/* MUSEUM LABEL */}
                    <div className="figure-label">
                      <span className="figure-id"></span>
                      <span className="figure-line"></span>
                      <span className="figure-text">Infinite recursion of the Möbius Strip.</span>
                    </div>
                  </header>

                  {/* SOCIAL SIDEBAR (Inside Hero Wrapper) */}
                  <div className="social-sidebar">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://substack.com" target="_blank" rel="noreferrer" className="social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
                    </a>
                  </div>
                </>
              ) : section.type === 'list' ? (
                <>
                  <h2 className="section-title">{section.title}</h2>
                  <ul className="interests-list">
                    {section.items.map((item, i) => (
                      <li key={i} className="interest-item">
                        <span className="interest-number">0{i + 1}</span> {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="section-title">{section.title}</h2>
                  <p className="section-text">{section.text}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;