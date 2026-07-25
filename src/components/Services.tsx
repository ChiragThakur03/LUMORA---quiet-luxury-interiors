import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { servicesData } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [activeId, setActiveId] = useState<string>('service-1');

  const activeService = servicesData.find(s => s.id === activeId) || servicesData[0];

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const accordionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scale-in the dynamic left column gently on viewport entry
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top bottom-=100',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Staggered slide/fade reveal for accordion rows
      if (accordionContainerRef.current) {
        const rows = accordionContainerRef.current.children;
        gsap.fromTo(rows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: accordionContainerRef.current,
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
      id="services" 
      className="py-24 md:py-32 relative bg-[#0E0D0D] border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.2px,transparent_0.2px)] [background-size:20px_20px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [02]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            Our Expertise
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Dynamic Headlines & Representative Image */}
          <div 
            ref={leftColRef}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 self-start will-change-transform"
          >
            {/* Dynamic Title and Copy Container with defined min-height to prevent vertical layout shifts */}
            <div className="min-h-[140px] sm:min-h-[120px] lg:min-h-[180px] flex flex-col justify-end space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                    {activeService.copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* High-quality smooth transitioning representative image */}
            <div className="relative overflow-hidden aspect-[4/3] w-full bg-neutral-900 border border-white/10 shadow-2xl">
              {/* Luxury Corner Border Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C5A880]/30 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C5A880]/30 z-20 pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Shading Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0D]/60 via-transparent to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* Right Column: Accordions - matching wireframe aesthetics */}
          <div 
            ref={accordionContainerRef}
            className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10"
          >
            {servicesData.map((service) => {
              const isOpen = activeId === service.id;
              return (
                <div 
                  key={service.id} 
                  className={`py-6 md:py-8 transition-all duration-300 px-4 -mx-4 cursor-pointer ${
                    isOpen ? 'bg-white/[0.02]' : 'bg-transparent'
                  }`}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(service.id);
                    }}
                    className="w-full flex items-start justify-between text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-4 flex-grow pr-4">
                      <h3 className={`text-2xl md:text-3xl font-serif transition-colors duration-300 ${
                        isOpen ? 'text-[#C5A880]' : 'text-white group-hover:text-[#C5A880]'
                      }`}>
                        {service.title}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`text-[10px] uppercase tracking-wider px-3 py-1 border font-semibold rounded-none transition-colors duration-300 ${
                              isOpen 
                                ? 'bg-[#C5A880]/10 border-[#C5A880]/20 text-[#C5A880]' 
                                : 'bg-white/5 border-white/10 text-neutral-400'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`flex-shrink-0 mt-2 p-1.5 border rounded-none transition-colors duration-300 ${
                      isOpen 
                        ? 'border-[#C5A880] text-[#C5A880]' 
                        : 'border-white/10 text-neutral-400 group-hover:border-[#C5A880] group-hover:text-[#C5A880]'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 space-y-6 text-neutral-400 font-light">
                          <p className="text-sm md:text-base leading-relaxed">
                            {service.copy}
                          </p>

                          {/* Specific list points for quiet luxury value */}
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-white/5 pt-6">
                            {service.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-neutral-400">
                                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-none"></span>
                                <span className="font-sans font-light">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
