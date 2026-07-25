import { useState, useEffect } from 'react';
import Header from './components/Header';

import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Enquiry } from './types';

export default function App() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // Load enquiries from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lumora_enquiries');
    if (saved) {
      try {
        setEnquiries(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing saved enquiries', err);
      }
    } else {
      // Prepopulate with a premium sample enquiry to show active state
      const sampleEnquiries: Enquiry[] = [
        {
          id: 'sample-1',
          name: 'Adrian Sterling',
          email: 'adrian@sterlingassets.co',
          location: 'Kensington, London',
          brief: 'Looking to completely redesign a 4-bedroom Victorian townhouse, restoring classic brick fireplaces and introducing modern alabaster plaster wall treatments.',
          timestamp: new Date().toLocaleDateString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          status: 'Reviewing'
        }
      ];
      setEnquiries(sampleEnquiries);
      localStorage.setItem('lumora_enquiries', JSON.stringify(sampleEnquiries));
    }
  }, []);

  // Sync to LocalStorage whenever enquiries changes
  const saveToLocalStorage = (updated: Enquiry[]) => {
    setEnquiries(updated);
    localStorage.setItem('lumora_enquiries', JSON.stringify(updated));
  };

  // Add new submitted enquiry
  const handleAddEnquiry = (newEnq: Omit<Enquiry, 'id' | 'timestamp' | 'status'>) => {
    const fresh: Enquiry = {
      ...newEnq,
      id: `enq-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Received'
    };
    const updated = [fresh, ...enquiries];
    saveToLocalStorage(updated);
  };

  // Delete enquiry (Admin clean up tool)
  const handleDeleteEnquiry = (id: string) => {
    const updated = enquiries.filter(item => item.id !== id);
    saveToLocalStorage(updated);
  };

  // Smooth scroll helper matching exact coordinates
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#hero');
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90; // Adjust for sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without causing a default browser jump-scroll
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Force scroll to top and reset hash to #hero on reload, disabling default browser scroll restoration
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });

    // Set the hash back to hero so it starts fresh from the beginning
    window.history.replaceState(null, '', '#hero');
  }, []);

  // Sync scroll position with the URL hash as the user scrolls
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'services', 'projects', 'approach', 'journal', 'contact'];

    const handleScroll = () => {
      // If we are at the very top of the page, map to hero
      if (window.scrollY < 50) {
        if (window.location.hash !== '#hero') {
          window.history.replaceState(null, '', '#hero');
        }
        return;
      }

      const scrollPosition = window.scrollY + 180; // Focal offset (header height + buffer)
      let activeSectionId = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            activeSectionId = id;
            break;
          }
        }
      }

      if (activeSectionId) {
        const newHash = `#${activeSectionId}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, '', newHash);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Listen to browser back/forward history hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace('#', '');
        if (sectionId === 'hero') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0A0A] text-neutral-100 overflow-x-hidden selection:bg-[#C5A880] selection:text-black">
      {/* Absolute Grid overlay for general quiet luxury background details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* Primary Sticky Header */}
      <Header onNavigate={handleScrollToSection} />

      {/* Main Sections Body */}
      <main className="relative z-10">
        
        {/* [00] Hero Landing Header */}
        <Hero onNavigate={handleScrollToSection} />

        {/* Social Proof Stats Banner */}
        <TrustStrip />

        {/* [01] About Section */}
        <About />

        {/* [02] Services Accordion Section */}
        <Services />

        {/* [03] Filterable Portfolio Gallery */}
        <Portfolio />

        {/* [04] Testimonials Quotes Section */}
        <Testimonials />

        {/* [05] Dynamic Stepper Process */}
        <Process />

        {/* [06] Accordion FAQs */}
        <FAQ />

        {/* [07] Contact enquiry form with reactive local sync tracker */}
        <Contact 
          enquiries={enquiries}
          onAddEnquiry={handleAddEnquiry}
          onDeleteEnquiry={handleDeleteEnquiry}
        />

      </main>

      {/* Studio Premium Footer */}
      <Footer onNavigate={handleScrollToSection} />
    </div>
  );
}
