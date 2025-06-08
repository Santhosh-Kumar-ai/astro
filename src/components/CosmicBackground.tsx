import React from 'react';

const CosmicBackground: React.FC = () => {
  return (
    <>
      {/* Starfield */}
      <div className="starfield">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating cosmic particles */}
      <div className="cosmic-particles">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${20 * i + 10}%`,
              animationDelay: `${-2 * i}s`,
              animationDuration: `${6 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Aurora gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)
          `
        }}
      />
    </>
  );
};

export default CosmicBackground;