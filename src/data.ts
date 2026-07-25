import { Project, ServiceItem, Testimonial, ProcessStep, FAQItem } from './types';

export const projectsData: Project[] = [
  {
    id: 'townhouse',
    title: 'Townhouse Residence',
    category: 'Full interior redesign',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    outcome: 'Transformed a compact residence into a calm, light-filled home with bespoke storage.',
    location: 'Kensington, London',
    year: '2025',
    details: 'A complete restoration of a five-story Grade II listed Victorian townhouse. The brief was to restore historic grandeur while embedding ultra-modern amenities. We crafted custom built-in white oak wardrobes, installed custom alabaster plaster finishes on the walls, and styled with warm, textured neutral linens.'
  },
  {
    id: 'linen-house',
    title: 'The Linen House',
    category: 'Boutique guest suite concept',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    outcome: 'A serene guest suite blending soft textures, linen wall coverings, and integrated oak headboards.',
    location: 'The Cotswolds',
    year: '2025',
    details: 'For this luxury boutique countryside escape, we designed four custom suites. The rooms feature raw plaster walls, textured linen textiles, and beautifully integrated light oak headboards with ambient backlighting that creates an atmospheric, quiet luxury experience.'
  },
  {
    id: 'mayfair',
    title: 'Mayfair Apartment',
    category: 'Material palette & furnishing scheme',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    outcome: 'Curated warm travertine textures and custom bronze hardware for a sophisticated private residence.',
    location: 'Mayfair, London',
    year: '2026',
    details: 'A pied-à-terre featuring rich timber cladding and floating travertine volumes. Our studio customized the entire furniture scheme, pairing collectible mid-century pieces with modern, sculptural elements and textured textiles in shades of oat, charcoal, and warm bronze.'
  },
  {
    id: 'coastal',
    title: 'Coastal Retreat',
    category: 'Renovation & styling',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    outcome: 'Brought calm shoreline elements into a light-filled space using natural fibers and rustic limewash finishes.',
    location: 'St Ives, Cornwall',
    year: '2024',
    details: 'Perched overlooking the sea, this retreat is designed for quiet reflection. We utilized soft lime-wash paint on the walls, exposed warm cedar ceiling beams, and curated heavy-textured Bouclé seating, bringing raw external elements into a highly polished interior context.'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'service-1',
    title: 'Interior Design',
    tags: ['Concept direction', 'Spatial planning', 'Styling'],
    copy: 'Tailored interiors designed to feel cohesive, sophisticated, and uniquely yours.',
    details: [
      'Comprehensive space planning and 2D/3D layouts',
      'Moodboard curation with material swatches and colour concepts',
      'Curation of art, accessories, and ambient lighting schemas',
      'Full architectural integration and design detailing'
    ],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-2',
    title: 'Material & Finish Selection',
    tags: ['Stone', 'Timber', 'Textiles'],
    copy: 'Curated palettes and finishes chosen to bring warmth, texture, and longevity to every space.',
    details: [
      'Sourcing of premium marbles, travertine, and architectural stones',
      'Selection of custom timber grades, finishes, and treatment options',
      'Curating wall coverings, specialty plaster finishes, and limewashes',
      'Bespoke textile palettes including premium linen, silk, and bouclé'
    ],
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-3',
    title: 'Space Planning & Joinery',
    tags: ['Bespoke pieces', 'Custom storage', 'Detailing'],
    copy: 'Custom furniture and joinery solutions that elevate function without compromising beauty.',
    details: [
      'Bespoke media units, dressing rooms, and floating study joinery',
      'Tailored kitchen cabinets and bathroom vanity design',
      'Sourcing high-end, rare, and mid-century collectible furnishings',
      'Detailed construction-ready drawings and specification files'
    ],
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-4',
    title: 'Project Management',
    tags: ['Procurement', 'Contractor liaison', 'Installation'],
    copy: 'Careful management from design sign-off through to final styling and handover.',
    details: [
      'End-to-end procurement and order tracking management',
      'Site visits and coordination with principal contractors',
      'Detailed installation coordination including styling on-site',
      'Final turnover with custom sensory details (candles, styling accents)'
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'They understood exactly what we wanted before we could explain it properly. The result feels elegant, calm, and completely us.',
    author: 'Amina Clarke',
    role: 'Private Client',
    project: 'Kensington Townhouse'
  },
  {
    id: 'test-2',
    quote: 'The attention to detail was exceptional. Every material, piece of furniture, and finish feels considered with care and restraint.',
    author: 'Jenna Price',
    role: 'Homeowner',
    project: 'Mayfair Apartment'
  },
  {
    id: 'test-3',
    quote: 'They brought structure to a complex restoration project and made the entire process feel seamless from concept through to styling.',
    author: 'Chloe Morgan',
    role: 'Boutique Hotel Director',
    project: 'The Linen House Guest Suite'
  }
];

export const processStepsData: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We learn about your space, lifestyle, project goals, and aesthetic direction to define a coherent design brief.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
  },
  {
    number: '02',
    title: 'Design Development',
    description: 'We create the concept, layouts, detailed space planning, core material palette, and preliminary furnishing direction.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    number: '03',
    title: 'Specification & Sourcing',
    description: 'We refine selection models, source specialized finishes, coordinate with custom suppliers, and prepare the project specifications for tender.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80'
  },
  {
    number: '04',
    title: 'Installation & Styling',
    description: 'We oversee the precise placement of furnishings, custom joinery fits, styling details, and deliver the final sensory reveal.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80'
  }
];

export const faqsData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you take on full home renovations?',
    answer: 'Yes, absolutely. We work on full residential renovations, boutique hospitality properties, and selected complete room or suite commissions.'
  },
  {
    id: 'faq-2',
    question: 'Do you offer furnishing-only services?',
    answer: 'Yes. We design and source bespoke furnishings, collectible vintage pieces, lighting, art, and accessories for completed or newly renovated architectural spaces.'
  },
  {
    id: 'faq-3',
    question: 'How involved are you during installation?',
    answer: 'We coordinate very closely with contractors throughout the project. In the final phase, our design team oversees the delivery, joinery fitting, carpet lay, furniture placement, and styling.'
  },
  {
    id: 'faq-4',
    question: 'Do you work outside London?',
    answer: 'Yes. While our primary design studio is located in London, we regularly design and execute projects throughout the UK and internationally.'
  }
];
