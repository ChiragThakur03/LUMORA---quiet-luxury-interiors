import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Clock, CheckCircle2, Eye, EyeOff, ShieldCheck, Trash2 } from 'lucide-react';
import { Enquiry } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  enquiries: Enquiry[];
  onAddEnquiry: (enquiry: Omit<Enquiry, 'id' | 'timestamp' | 'status'>) => void;
  onDeleteEnquiry: (id: string) => void;
}

export default function Contact({ enquiries, onAddEnquiry, onDeleteEnquiry }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [brief, setBrief] = useState('');
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !location || !brief) return;

    onAddEnquiry({
      name,
      email,
      location,
      brief,
    });

    setSubmittedName(name);
    setName('');
    setEmail('');
    setLocation('');
    setBrief('');

    // Clear success banner after 8 seconds
    setTimeout(() => {
      setSubmittedName(null);
    }, 8000);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left narrative col sliding up
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Right form block scale-in
      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top bottom-=100',
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
      id="contact" 
      className="py-24 md:py-32 relative bg-[#0B0A0A]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.2px,transparent_0.2px)] [background-size:20px_20px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [07]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            Inquire & Contact
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Headline and detail note */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8 will-change-transform">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
                Begin your project with a <span className="italic text-[#C5A880]">conversation</span>.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                Tell us about your home, your space, or the project you are planning. We will respond with the next steps and how we can help.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center space-x-3 text-sm text-neutral-400">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span>Response time: <strong className="text-[#C5A880]">1–2 business days</strong></span>
              </div>
              <div className="text-xs text-neutral-500 leading-relaxed font-light">
                Our principal designer personally reviews all initial briefs. Let’s collaborate to make your space bespoke.
              </div>
            </div>
          </div>

          {/* Right Column: Contact form with beautiful feedback */}
          <div 
            ref={rightColRef}
            className="lg:col-span-7 bg-[#0E0D0D] border border-white/5 p-8 md:p-12 relative group will-change-transform"
          >
            {/* Outline highlight frame */}
            <div className="absolute inset-0 border border-[#C5A880]/10 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {submittedName ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-12"
                >
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-[#C5A880] stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-white">
                      Enquiry Received
                    </h3>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto font-light leading-relaxed">
                      Thank you, <span className="text-[#C5A880] font-medium">{submittedName}</span>. Your project brief has been recorded successfully. Our design team will contact you soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmittedName(null)}
                    className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] hover:text-white border-b border-[#C5A880] pb-1 transition-all cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans block">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0B0A0A] border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C5A880] transition-colors rounded-none font-sans font-light"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0B0A0A] border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C5A880] transition-colors rounded-none font-sans font-light"
                    />
                  </div>

                  {/* Location field */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans block">
                      Project Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      required
                      placeholder="e.g. Kensington, London or International"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#0B0A0A] border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C5A880] transition-colors rounded-none font-sans font-light"
                    />
                  </div>

                  {/* Project Brief */}
                  <div className="space-y-2">
                    <label htmlFor="brief" className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans block">
                      Project Brief
                    </label>
                    <textarea
                      id="brief"
                      required
                      rows={4}
                      placeholder="Tell us about your home, layout plans, or furnishing timeline..."
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="w-full bg-[#0B0A0A] border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C5A880] transition-colors rounded-none resize-none font-sans font-light leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#C5A880] hover:bg-[#b2946c] text-neutral-950 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-none shadow-lg flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Send enquiry</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Dynamic Admin Monitor Panel */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Admin Monitor State ({enquiries.length} received)</span>
            </div>
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="flex items-center space-x-1.5 text-xs text-neutral-400 hover:text-[#C5A880] transition-colors focus:outline-none cursor-pointer"
            >
              {showAdminPanel ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Enquiries</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Enquiries</span>
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showAdminPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-6"
              >
                {enquiries.length === 0 ? (
                  <p className="text-xs text-neutral-600 italic bg-white/5 p-4 border border-white/5 text-center">
                    No enquiries submitted yet. Submit the form above to witness reactive state logging!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enquiries.map((enq) => (
                      <div 
                        key={enq.id} 
                        className="bg-[#0E0D0D] border border-white/10 p-5 space-y-3 relative group rounded-none"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-semibold text-white font-serif">{enq.name}</h4>
                            <p className="text-xs text-[#C5A880]">{enq.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[9px] uppercase px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-none font-bold">
                              {enq.status}
                            </span>
                            <button
                              onClick={() => onDeleteEnquiry(enq.id)}
                              className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                              title="Delete submission record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-neutral-400 font-light space-y-1.5 pt-2 border-t border-white/5">
                          <p><strong>Location:</strong> {enq.location}</p>
                          <p className="line-clamp-2"><strong>Brief:</strong> {enq.brief}</p>
                        </div>

                        <p className="text-[9px] text-neutral-600 text-right font-sans">
                          {enq.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
