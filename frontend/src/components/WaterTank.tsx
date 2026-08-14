import React from 'react';

interface WaterTankProps {
  progress: number; // 0-100
  className?: string;
}

const WaterTank: React.FC<WaterTankProps> = ({ progress, className = "" }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Outer Water Jar Frame */}
      <div className="relative w-36 h-56 px-2">
        {/* Top Metallic/Primary Cap */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-primary-dark via-primary to-primary-dark rounded-t-lg shadow-md z-20 flex items-center justify-center border-b border-white/20">
          <div className="w-8 h-1 bg-white/40 rounded-full" />
        </div>

        {/* Tank Body (Glass Jar Container) */}
        <div className="relative w-full h-full pt-4">
          <div className="relative w-full h-[calc(100%-1rem)] border-4 border-primary/80 rounded-b-[2rem] rounded-t-lg bg-card/60 backdrop-blur-md shadow-lg overflow-hidden flex flex-col justify-end">
            
            {/* Percentage Scale Markings (Aligned to exact height levels) */}
            <div className="absolute inset-y-2 left-2 flex flex-col justify-between pointer-events-none z-20 text-[10px] font-semibold text-muted-foreground/80">
              {[100, 75, 50, 25, 0].map((level) => (
                <div key={level} className="flex items-center gap-1">
                  <div className="w-2.5 h-[1.5px] bg-primary/40" />
                  <span className="leading-none drop-shadow-sm">{level}%</span>
                </div>
              ))}
            </div>

            {/* Glass Highlight Sheen (Left & Right Reflections) */}
            <div className="absolute inset-y-0 left-1 w-2 bg-gradient-to-r from-white/30 to-transparent z-20 rounded-l-md pointer-events-none" />
            <div className="absolute inset-y-0 right-1 w-1.5 bg-gradient-to-l from-white/20 to-transparent z-20 pointer-events-none" />

            {/* Water Fill Layer */}
            <div
              className="relative w-full transition-all duration-700 ease-out"
              style={{ height: `${clampedProgress}%` }}
            >
              {/* Water Gradient Body */}
              <div 
                className="w-full h-full rounded-b-[1.7rem] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 100%)'
                }}
              >
                {/* Surface Wave Animation */}
                {clampedProgress > 0 && (
                  <div className="absolute -top-2 left-0 w-[200%] h-4 opacity-90 pointer-events-none overflow-hidden">
                    <svg className="w-full h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path 
                        d="M0,0 C150,90 350,-40 500,40 C650,110 900,-20 1200,40 L1200,120 L0,120 Z" 
                        fill="#7dd3fc"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                )}

                {/* Animated Floating Bubbles */}
                {clampedProgress > 5 && (
                  <>
                    <div className="absolute bottom-2 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bubble-1" />
                    <div className="absolute bottom-4 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-bubble-2" />
                    <div className="absolute bottom-1 left-2/3 w-2.5 h-2.5 bg-white/30 rounded-full animate-bubble-3" />
                  </>
                )}
              </div>
            </div>

            {/* Water Droplets Animation (Falling into tank when progress > 0) */}
            {clampedProgress > 0 && clampedProgress < 100 && (
              <div className="absolute top-0 inset-x-0 h-10 pointer-events-none z-30">
                <div className="absolute left-1/2 -translate-x-1/2 top-1 w-2 h-2.5 bg-sky-400 rounded-full animate-drop-1" />
                <div className="absolute left-2/3 top-0 w-1.5 h-2 bg-sky-300 rounded-full animate-drop-2" />
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Progress Label Badge below Jar */}
      <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide">
        {Math.round(clampedProgress)}% Filled
      </div>
    </div>
  );
};

export default WaterTank;