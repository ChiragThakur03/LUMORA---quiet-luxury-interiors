import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const proofItems = [
    { number: '20+', label: 'Completed Interiors', detail: 'High-end custom residences' },
    { number: '8', label: 'Global Cities', detail: 'UK and international projects' },
    { number: '100%', label: 'Bespoke Design', detail: 'Concept through to installation' }
  ];

  const brandLogos = [
    'KENSINGTON DEVELOPMENTS',
    'MAISON LUXE CO.',
    'COTSWOLD BOUTIQUE HOTELS',
    'MAYFAIR INVESTMENTS'
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left side content fade-in
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Stats staggered fade-up
      if (statsRef.current) {
        const statElements = statsRef.current.children;
        gsap.fromTo(statElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Partner logos fade-up and micro-drift
      if (partnersRef.current) {
        const partnerLogos = partnersRef.current.querySelectorAll('.partner-logo');
        gsap.fromTo(partnerLogos,
          { opacity: 0, x: 10 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: partnersRef.current,
              start: 'top bottom-=40',
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
      id="trust" 
      className="bg-[#0E0D0D] border-y border-white/5 py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.2px,transparent_0.2px)] [background-size:16px_16px] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines and microcopy */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-4 will-change-transform">
            <span className="text-[10px] text-[#C5A880] tracking-widest font-semibold uppercase block">
              [ Social Proof ]
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-snug">
              Trusted by homeowners, developers, and hospitality brands.
            </h2>
            <p className="text-neutral-400 text-sm font-light max-w-sm">
              Residential interiors, boutique spaces, and fully tailored design services from concept to handover.
            </p>
          </div>

          {/* Right Column: Premium grid of metrics & stats */}
          <div 
            ref={statsRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12"
          >
            {proofItems.map((item, index) => (
              <div key={index} className="space-y-2 group will-change-transform">
                <div className="text-3xl md:text-4xl font-serif text-[#C5A880] group-hover:translate-x-1 transition-transform duration-300">
                  {item.number}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white tracking-wide">
                    {item.label}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Minimalist text-based logo strip to show active developer trust */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 md:gap-8">
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-semibold w-full md:w-auto mb-2 md:mb-0">
            Collaborating Partners
          </p>
          <div 
            ref={partnersRef}
            className="flex flex-wrap items-center justify-start md:justify-end gap-x-12 gap-y-4 flex-grow"
          >
            {brandLogos.map((brand, i) => (
              <span 
                key={i} 
                className="partner-logo text-xs tracking-[0.25em] font-medium text-neutral-500 hover:text-white transition-colors duration-300 select-none font-serif cursor-default will-change-transform"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
