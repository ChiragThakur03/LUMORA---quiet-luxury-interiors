import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { testimonialsData } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
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
      id="testimonials" 
      className="py-24 md:py-32 relative bg-[#0E0D0D] border-t border-white/5"
    >
      {/* Delicate Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.2px,transparent_0.2px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [04]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            Client Testimonials
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
            Words from clients who trusted us with their <span className="italic text-[#C5A880]">space</span>.
          </h2>
          <p className="text-neutral-400 text-sm font-light">
            Reflecting on design journeys completed with mutual confidence and seamless cooperation.
          </p>
        </div>

        {/* Testimonials Grid - Matching reference image styled card structure */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonialsData.map((t, i) => (
            <div 
              key={t.id} 
              className="bg-[#0B0A0A] border border-white/5 p-8 flex flex-col justify-between space-y-8 hover:border-[#C5A880]/30 transition-all duration-300 relative group will-change-transform"
            >
              {/* Corner accent line like premium cards */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#C5A880]/40 group-hover:w-full transition-all duration-500"></div>

              {/* Card Header Info */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-base font-serif font-medium text-white group-hover:text-[#C5A880] transition-colors">
                    {t.author}
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans tracking-wide">
                    {t.role} · <span className="text-neutral-400 font-medium">{t.project}</span>
                  </p>
                </div>
                <span className="text-xs font-sans text-neutral-600 font-semibold tracking-widest">
                  [ 0{i + 1} ]
                </span>
              </div>

              {/* Premium asterisk or star accent */}
              <div className="text-[#C5A880] flex space-x-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A880] stroke-none" />
                ))}
              </div>

              {/* Quote copy */}
              <blockquote className="text-neutral-300 font-serif font-light text-base leading-relaxed italic flex-grow">
                “{t.quote}”
              </blockquote>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                <span>Verified Client</span>
                <span className="text-[#C5A880] font-sans">★ ★ ★ ★ ★</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
