import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { processStepsData } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const stepperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image translation parallax inside its frame
      if (imageContainerRef.current) {
        const wrap = imageContainerRef.current.querySelector('.parallax-step-wrap');
        if (wrap) {
          gsap.fromTo(wrap,
            { yPercent: -10, scale: 1.12 },
            {
              yPercent: 10,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      }

      // Border outline parallax offset speed difference
      if (borderRef.current) {
        gsap.fromTo(borderRef.current,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      // Stepper blocks slide-in stagger
      if (stepperContainerRef.current) {
        const blocks = stepperContainerRef.current.children;
        gsap.fromTo(blocks,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepperContainerRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="approach" 
      className="py-24 md:py-32 relative bg-[#0B0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [05]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            Our Approach
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Dynamic Process Image Frame */}
          <div className="lg:col-span-5 relative group order-last lg:order-first">
            {/* Outline highlight frame */}
            <div 
              ref={borderRef}
              className="absolute inset-0 border border-[#C5A880]/20 translate-x-3 translate-y-3 pointer-events-none will-change-transform"
            ></div>
            
            <div 
              ref={imageContainerRef}
              className="relative overflow-hidden aspect-[4/5] bg-neutral-900 border border-white/10"
            >
              <div className="parallax-step-wrap w-full h-full will-change-transform">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStepIdx}
                    src={processStepsData[activeStepIdx].image}
                    alt={processStepsData[activeStepIdx].title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {/* Cover shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Overlay Label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold font-sans">
                  Active Phase
                </span>
                <p className="text-xl font-serif text-white mt-1">
                  Step {processStepsData[activeStepIdx].number} — {processStepsData[activeStepIdx].title}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Process Narrative and Stepper list */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
                We shape each project with <span className="italic text-[#C5A880]">care</span>.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base font-light max-w-lg">
                A considered, high-touch process that keeps the design vision transparent and the delivery experience completely seamless.
              </p>
            </div>

            {/* Stepper block list */}
            <div 
              ref={stepperContainerRef}
              className="space-y-4"
            >
              {processStepsData.map((step, idx) => {
                const isActive = activeStepIdx === idx;
                return (
                  <button
                    key={step.number}
                    onMouseEnter={() => setActiveStepIdx(idx)}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`w-full text-left p-6 flex items-start space-x-6 border transition-all duration-300 focus:outline-none cursor-pointer ${
                      isActive 
                        ? 'bg-white/5 border-[#C5A880] translate-x-2' 
                        : 'bg-transparent border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Step Number Badge */}
                    <span className={`text-sm font-sans font-bold tracking-widest px-3 py-1.5 border ${
                      isActive 
                        ? 'border-[#C5A880]/30 text-[#C5A880] bg-[#C5A880]/10' 
                        : 'border-white/5 text-neutral-500 bg-white/5'
                    }`}>
                      {step.number}
                    </span>

                    <div className="space-y-2 flex-grow">
                      <h3 className={`text-lg md:text-xl font-serif ${
                        isActive ? 'text-white font-medium' : 'text-neutral-300'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs md:text-sm font-light leading-relaxed ${
                        isActive ? 'text-neutral-300' : 'text-neutral-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
