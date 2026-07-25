import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const sectionRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic filter lists
  const categories = ['All', 'Residential', 'Hospitality', 'Renovation', 'Styling'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => {
        if (filter === 'Residential') return p.category.toLowerCase().includes('interior') || p.category.toLowerCase().includes('residence');
        if (filter === 'Hospitality') return p.category.toLowerCase().includes('boutique') || p.category.toLowerCase().includes('guest');
        if (filter === 'Renovation') return p.category.toLowerCase().includes('renovation');
        if (filter === 'Styling') return p.category.toLowerCase().includes('material') || p.category.toLowerCase().includes('styling');
        return true;
      });

  useEffect(() => {
    // Recalculate ScrollTrigger measurements after layout animation is done
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax effect on all active grid card images
      const images = gsap.utils.toArray<HTMLImageElement>('.portfolio-image');
      images.forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -12, scale: 1.12 },
          {
            yPercent: 12,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]); // Rebind triggers to the newly rendered filtered images

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 md:py-32 relative bg-[#0B0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <span className="text-sm font-sans font-semibold tracking-widest text-[#C5A880]">
            [03]
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
            Featured Portfolio
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Spaces that feel composed, <span className="italic text-[#C5A880]">layered</span>, and lived in.
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light">
              A selection of interiors shaped through atmosphere, detail, and restraint.
            </p>
          </div>

          {/* Filter Categories tab */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-none border cursor-pointer ${
                  filter === cat 
                    ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/5' 
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div 
          ref={gridContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative overflow-hidden bg-[#0E0D0D] border border-white/5"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/3] w-full overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="portfolio-image w-full h-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>

                {/* Info Overlay / Caption details */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-semibold font-sans">
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#C5A880] transition-colors mt-1">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-xs text-neutral-500 font-sans tracking-widest uppercase mt-1">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                    “{project.outcome}”
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-neutral-500 group-hover:text-white transition-colors duration-300 font-semibold uppercase tracking-wider font-sans pt-2 border-t border-white/5">
                    <span>Explore details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-[#C5A880]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-start md:items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0E0D0D] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-[#C5A880] text-white hover:text-black transition-colors focus:outline-none cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Large image representation */}
              <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto min-h-[300px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-semibold block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl font-serif text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Right Side: Detailed brief */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-400 border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-4 h-4 text-[#C5A880]" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-[#C5A880]" />
                      <span>{selectedProject.year}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                      Outcome Brief
                    </h4>
                    <p className="text-sm italic text-neutral-300 leading-relaxed font-light bg-white/5 p-4 border-l-2 border-[#C5A880]">
                      “{selectedProject.outcome}”
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                      Design Narrative
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                      {selectedProject.details}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-neutral-600 font-semibold font-sans">
                    Lumora Studio London
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] hover:text-white transition-colors cursor-pointer"
                  >
                    Close Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
