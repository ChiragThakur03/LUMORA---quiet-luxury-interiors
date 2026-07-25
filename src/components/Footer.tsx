interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { label: 'BEHANCE', url: '#' },
    { label: 'DRIBBBLE', url: '#' },
    { label: 'LINKEDIN', url: '#' },
    { label: 'INSTAGRAM', url: '#' },
  ];

  const footerLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Journal', id: 'journal' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#0B0A0A] border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Upper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Column 1: Studio Name and Tagline */}
          <div className="md:col-span-5 space-y-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}
              className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-white inline-block hover:opacity-80 transition-opacity cursor-pointer"
            >
              LUMORA<span className="text-[#C5A880]">.</span>
            </a>
            <p className="text-neutral-400 text-sm font-light max-w-sm leading-relaxed">
              Luxury interior design for homes and spaces with quiet confidence. Crafting bespoke sanctuaries through material restraint and design clarity.
            </p>
          </div>

          {/* Column 2: Social media blocks */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Connect
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white font-semibold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all pb-1 cursor-pointer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Custom Directory */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#C5A880] transition-colors font-medium cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600 uppercase tracking-widest font-semibold">
          <p>© 2026 Lumora Studio. All rights reserved.</p>
          <div className="flex space-x-6 text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
