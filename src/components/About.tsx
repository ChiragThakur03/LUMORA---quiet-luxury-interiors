import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Elegant heading fade-up and slight tilt/slide
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Paragraphs staggered reveal
      if (parasRef.current) {
        gsap.fromTo(parasRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: parasRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Atmospheric visual image vertical scroll parallax
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { yPercent: -12, scale: 1.12 },
          {
            yPercent: 12,
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

      // Outer accent border outline scrolling at a slightly different rate
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 md:py-32 relative overflow-hidden bg-[#0B0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [01]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            About the Studio
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-8">
            <h2 
              ref={titleRef}
              className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight will-change-transform"
            >
              We began with one belief: beautiful spaces should feel <span className="italic text-[#C5A880]">effortless</span>.
            </h2>
            
            <div 
              ref={parasRef}
              className="space-y-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-2xl"
            >
              <p className="will-change-transform">
                We create interiors that balance elegance, comfort, and function. From concept development and space planning to sourcing, styling, and final installation, every detail is considered with care.
              </p>
              <p className="will-change-transform">
                Our work is shaped by materials, light, proportion, and the way a space should make you feel. We believe in raw, tactile honesty—combining natural stone textures, refined timber, and bespoke details into a quiet sanctuary.
              </p>
            </div>

            {/* Side Note / Small Caption */}
            <div className="inline-flex items-start space-x-3 bg-white/5 border border-white/10 p-5 max-w-md select-none">
              <MapPin className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold font-sans">
                  Studio Presence
                </p>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Based in London. Designing projects across the UK and internationally.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Warm, atmospheric visual asset with frame borders */}
          <div className="lg:col-span-5 relative group">
            <div 
              ref={borderRef}
              className="absolute inset-0 border border-[#C5A880]/30 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 pointer-events-none will-change-transform"
            ></div>
            <div className="relative overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Atmospheric studio design detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0A]/50 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <p className="text-[10px] text-white/60 tracking-widest uppercase font-semibold">
                  Detail Shot
                </p>
                <p className="text-sm font-serif italic text-[#C5A880] mt-1">
                  Sourced Ceramics & Limestone Accents, London Project
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
