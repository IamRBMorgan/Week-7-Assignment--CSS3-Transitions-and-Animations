
import React from 'react';

const AnimatedShapes: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="animate-float absolute top-[10%] left-[10%] w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
      <div className="animate-float-delay-1 absolute top-[20%] right-[15%] w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
      <div className="animate-float-delay-2 absolute bottom-[15%] left-[20%] w-28 h-28 bg-indigo-500/20 rounded-full blur-xl"></div>
      <div className="animate-float-delay-3 absolute bottom-[10%] right-[10%] w-24 h-24 bg-pink-500/20 rounded-full blur-xl"></div>
      
      <div className="animate-spin-slow absolute top-[30%] left-[30%] w-40 h-40">
        <div className="w-full h-full border-2 border-dashed border-primary/30 rounded-full"></div>
      </div>
      
      <div className="animate-spin-slow absolute bottom-[20%] right-[20%] w-60 h-60" style={{ animationDirection: 'reverse' }}>
        <div className="w-full h-full border-2 border-dashed border-secondary/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default AnimatedShapes;
