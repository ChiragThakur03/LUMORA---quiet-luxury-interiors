import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const collageContainerRef = useRef<HTMLDivElement>(null);

  // Editorial images for the collage representing finished rooms, materials, details
  const collageImages = [
    {
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      title: 'Kensington Living',
      tag: 'Residential'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      title: 'Marble Details',
      tag: 'Materials'
    },
    {
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80',
      title: 'Cotswold Suite',
      tag: 'Hospitality'
    },
    {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      title: 'Bespoke Joinery',
      tag: 'Craft'
    },
    {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      title: 'St Ives Coastal',
      tag: 'Renovation'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background glow scrolls slowly (creates background depth)
      if (glowRef.current) {
        gsap.fromTo(glowRef.current,
          { yPercent: 0 },
          {
            yPercent: 35,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // Hero text content elements move upwards slightly slower (foreground depth)
      // Note: We use an outer container to apply GSAP parallax, separating it from the Framer Motion opacity transition
      if (heroContentRef.current) {
        gsap.fromTo(heroContentRef.current,
          { yPercent: 0 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // Collage container reacts horizontally & tilts slightly based on scroll position
      if (collageContainerRef.current) {
        gsap.fromTo(collageContainerRef.current,
          { xPercent: 0 },
          {
            xPercent: -8,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Background radial glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none will-change-transform"
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center text-center mt-6 md:mt-12">
        <div ref={heroContentRef} className="w-full will-change-transform">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 md:space-y-8 max-w-4xl mx-auto"
          >
          {/* Eyebrow marker */}
          <div className="flex items-center justify-center space-x-2 text-xs tracking-[0.2em] text-[#C5A880] uppercase font-semibold">
            <span>[ 00 ]</span>
            <span>Studio London</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[1.1] md:leading-tight">
            We design interiors with <span className="italic text-[#C5A880] font-normal font-serif">quiet luxury</span>.
          </h1>

          <p className="text-neutral-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-sans font-light">
            Bespoke interiors, refined finishes, and thoughtful spatial design for homes and hospitality spaces that feel calm, elegant, and deeply personal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-[#C5A880] hover:bg-[#b2946c] text-neutral-950 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 rounded-none shadow-lg flex items-center justify-center group cursor-pointer"
            >
              Enquire now
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 rounded-none flex items-center justify-center cursor-pointer"
            >
              View projects
            </button>
          </div>
        </motion.div>
      </div>
    </div>

      {/* Skewed dynamic editorial gallery collage - matching the wireframe references */}
      <div className="mt-16 md:mt-24 w-full overflow-hidden py-6 relative z-10">
        <div 
          ref={collageContainerRef}
          className="flex space-x-4 md:space-x-6 px-6 md:px-12 w-max animate-scroll-collage will-change-transform"
        >
          {/* Output 2 sets of collage list for continuous infinite sliding loop look, plus gorgeous spring-driven cards */}
          {[...collageImages, ...collageImages].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                y: -10,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              className="relative w-48 h-64 md:w-64 md:h-80 flex-shrink-0 overflow-hidden cursor-pointer group shadow-2xl origin-bottom rounded-none border border-white/5 transform rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-semibold block mb-1">
                  {img.tag}
                </span>
                <p className="text-white text-sm font-serif font-medium tracking-wide">
                  {img.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Down indicator */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => onNavigate('trust')}
          className="text-neutral-500 hover:text-white transition-colors duration-300 flex flex-col items-center space-y-2 focus:outline-none cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Explore Studio</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A880]" />
        </button>
      </div>
    </section>
  );
}
