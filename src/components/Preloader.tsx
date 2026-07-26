import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });

      // Initial state reset
      gsap.set([brandRef.current, subtitleRef.current, counterRef.current, progressBarRef.current], {
        opacity: 0,
        y: 25
      });

      // Step 1: Reveal Brand elements gracefully
      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .to([counterRef.current, progressBarRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3');

      // Step 2: Animate Progress from 0 to 100
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.round(counterObj.value);
          setProgress(val);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${val}%`;
          }
        }
      }, '-=0.2');

      // Step 3: Hold briefly at 100%
      tl.to({}, { duration: 0.25 });

      // Step 4: Fade out text elements first
      tl.to([brandRef.current, subtitleRef.current, counterRef.current, progressBarRef.current?.parentElement], {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in'
      });

      // Step 5: Elegant Split Curtain Exit Reveal
      tl.to(curtainTopRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'expo.inOut'
      }, '-=0.2')
      .to(curtainBottomRef.current, {
        yPercent: 100,
        duration: 0.85,
        ease: 'expo.inOut'
      }, '<');

      // Fade out main preloader container wrapper
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.1,
        display: 'none'
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto bg-transparent overflow-hidden"
    >
      {/* Top Half Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-[50.5%] bg-[#0B0A0A] border-b border-[#C5A880]/10 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#C5A88015_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* Bottom Half Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-[50.5%] bg-[#0B0A0A] border-t border-[#C5A880]/10 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#C5A88015_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10 opacity-40" />

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center select-none">
        
        {/* Brand Name */}
        <div ref={brandRef} className="will-change-transform">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight font-semibold text-white">
            LUMORA<span className="text-[#C5A880] inline-block animate-pulse">.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-3 will-change-transform">
          <p className="text-xs sm:text-sm font-sans tracking-[0.3em] sm:tracking-[0.45em] uppercase text-neutral-400 font-medium">
            Quiet Luxury Interiors
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-12 w-48 sm:w-64 h-[2px] bg-neutral-800/80 rounded-full overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#C5A880]/60 via-[#C5A880] to-[#E3C8A0] w-0 transition-all duration-75 shadow-[0_0_12px_rgba(197,168,128,0.5)]"
          />
        </div>

        {/* Numerical Counter */}
        <div ref={counterRef} className="mt-4 will-change-transform">
          <span className="font-mono text-xs sm:text-sm tracking-widest text-[#C5A880] font-light">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>

        {/* Location Tag */}
        <div className="mt-8 opacity-40">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
            London &bull; Paris &bull; New York
          </span>
        </div>

      </div>
    </div>
  );
}
