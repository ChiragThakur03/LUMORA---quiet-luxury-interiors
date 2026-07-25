import { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Approach', id: 'approach' },
    { label: 'About', id: 'about' },
    { label: 'Journal', id: 'journal' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    
    // Create a smooth show/hide tween for the header
    const showAnim = gsap.to(header, {
      yPercent: -100,
      duration: 0.35,
      ease: 'power2.inOut',
      paused: true
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        // If navigation drawer is open, keep the header visible
        if (isOpen) {
          showAnim.reverse();
          return;
        }

        const currentScrollY = window.scrollY;
        // Check if we have scrolled past a small threshold to avoid nervous toggling at top
        if (currentScrollY > 100) {
          if (self.direction === 1 && currentScrollY > lastScrollY) {
            // Scrolling down and actively going down - hide
            showAnim.play();
          } else if (self.direction === -1 || currentScrollY < lastScrollY) {
            // Scrolling up or actively going up - show
            showAnim.reverse();
          }
        } else {
          // Always show at the very top of the page
          showAnim.reverse();
        }
        lastScrollY = currentScrollY;
      }
    });

    return () => {
      scrollTriggerInstance.kill();
      showAnim.kill();
    };
  }, [isOpen]);

  return (
    <>
      <header 
        id="header" 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#0B0A0A]/95 via-[#0B0A0A]/85 to-transparent backdrop-blur-md px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/5 will-change-transform"
      >
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}
          className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-white hover:opacity-80 transition-opacity cursor-pointer"
        >
          LUMORA<span className="text-[#C5A880]">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase text-neutral-300">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className="relative hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300 pb-1 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-white hover:text-[#C5A880] transition-colors focus:outline-none z-50 group cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className="text-sm font-medium tracking-widest uppercase hidden sm:inline group-hover:tracking-[0.15em] transition-all">
            {isOpen ? 'Close' : 'Menu'}
          </span>
          {isOpen ? <X className="w-5 h-5 text-[#C5A880]" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </header>

      {/* Menu Overlay Drawer */}
      <div 
        className={`fixed inset-0 bg-[#0B0A0A] z-40 transition-transform duration-500 ease-in-out flex flex-col md:flex-row justify-between p-8 md:p-16 pt-32 overflow-y-auto pb-12 md:pb-16 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

        {/* Left Side: Navigation Links with beautiful sequence */}
        <div className="flex flex-col space-y-6 md:space-y-8 z-10 my-auto">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold font-sans">
            [ Navigation ]
          </p>
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="text-4xl md:text-6xl font-serif text-white hover:text-[#C5A880] transition-colors flex items-center group font-light cursor-pointer"
              >
                <span className="text-sm font-sans text-neutral-600 mr-4 group-hover:text-[#C5A880] transition-colors font-medium">
                  0{index + 1}
                </span>
                {item.label}
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#C5A880] ml-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Studio Meta Info */}
        <div className="border-t border-white/10 md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-16 flex flex-col justify-between max-w-sm z-10 mt-12 md:mt-auto">
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-white">
              Studio London
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Based in London. Designing bespoke interior projects across the UK and internationally.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-neutral-500">Contact</p>
              <p className="text-[#C5A880]">enquire@lumorastudio.com</p>
              <p className="text-neutral-300">+44 (0) 20 7244 8121</p>
            </div>
          </div>

          <div className="mt-12 md:mt-0 pt-6 border-t border-white/5 text-xs text-neutral-500 space-y-2">
            <p className="uppercase tracking-widest font-semibold text-neutral-600">Quiet Luxury Interiors</p>
            <p>© 2026 Lumora Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
