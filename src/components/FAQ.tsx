import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqsData } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left side content lift and fade-in
      if (leftSideRef.current) {
        gsap.fromTo(leftSideRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftSideRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // FAQ accordion rows stagger lift and fade-in
      if (faqListRef.current) {
        const rows = faqListRef.current.children;
        gsap.fromTo(rows,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqListRef.current,
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
      id="journal" 
      className="py-24 relative bg-[#0E0D0D] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [06]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            FAQ Guide
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Category details */}
          <div ref={leftSideRef} className="lg:col-span-5 space-y-4 will-change-transform">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Frequently asked <span className="italic text-[#C5A880]">questions</span>
            </h2>
            <p className="text-neutral-400 text-sm font-light max-w-sm">
              Have specific details or queries about custom project delivery? Review our standard operational guide below or get in touch.
            </p>
            
            <div className="pt-6">
              <a 
                href="#contact" 
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors font-semibold cursor-pointer"
              >
                <span>Ask a custom question</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Side: Accordion Lists */}
          <div 
            ref={faqListRef}
            className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10"
          >
            {faqsData.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-6 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-base md:text-lg font-serif font-light text-white group-hover:text-[#C5A880] transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 ml-4 text-neutral-500 group-hover:text-[#C5A880] transition-colors">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#C5A880]" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-neutral-400 text-sm font-light leading-relaxed font-sans">
                          {faq.answer}
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
