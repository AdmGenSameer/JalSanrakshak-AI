import React, { useEffect, useRef, useState } from 'react';
import SplashVideo from '../assets/Splash_Screen_Creative_Brief_.mp4';
import anime from 'animejs';

interface SplashScreenProps {
  onComplete?: () => void;
  autoPlay?: boolean;
  className?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoPlay = true,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phaseText, setPhaseText] = useState('JalSanrakshak AI');

  useEffect(() => {
    if (!autoPlay || !containerRef.current) return;

    // Fade in container
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1200,
      easing: 'spring(1, 80, 10, 0)'
    });
  }, [autoPlay]);

  // Sync the text perfectly with the looping video's playback percentage
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (!duration) return;
    
    const progress = currentTime / duration;
    
    if (progress < 0.25) {
      setPhaseText('JalSanrakshak AI');
    } else if (progress < 0.50) {
      setPhaseText('Capturing Rainwater...');
    } else if (progress < 0.75) {
      setPhaseText('Recharging Groundwater...');
    } else {
      setPhaseText('Growing a Greener Future! 🌱');
    }
  };

  const handleVideoEnded = () => {
    if (onComplete) {
      // Fade out effect before completing
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutSine',
        complete: onComplete
      });
    }
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col items-center w-full opacity-0 ${className}`}>
      
      {/* Video Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white">
        <video 
          ref={videoRef}
          src={SplashVideo} 
          autoPlay={autoPlay}
          muted 
          loop={!onComplete} // Loop infinitely if there's no completion handler (i.e. used in Hero)
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        />
        {/* Subtle inner shadow overlay for glass effect */}
        <div className="absolute inset-0 shadow-inner rounded-2xl pointer-events-none border border-black/5" />
      </div>

      {/* Text perfectly positioned below the video so it never blocks the tank */}
      <div className="mt-4 w-full flex justify-center px-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-xl px-6 py-3 shadow-lg border border-slate-200/60 max-w-full">
          <p className="text-sm md:text-base font-semibold bg-gradient-to-br from-slate-800 to-slate-500 bg-clip-text text-transparent tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {phaseText}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default SplashScreen;