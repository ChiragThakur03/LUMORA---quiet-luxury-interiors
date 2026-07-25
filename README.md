# Lumora — Quiet Luxury Interiors

Lumora is a bespoke interior design studio focused on quiet luxury, refined finishes, and thoughtful spatial design for high-end residential homes and boutique hospitality spaces.

<img width="956" height="449" alt="image" src="https://github.com/user-attachments/assets/63ba8d6c-0ad6-4f08-ae5d-d938647e7e92" />

## 🌐 Live Preview

Experience the Lumora studio platform live:

**[🚀 View Live Demo](https://lumora-interiors.vercel.app/)**

The site features real-time interactive components with smooth animations, dynamic galleries, and a seamless client consultation experience. Deployed on Vercel with continuous integration.

## ✨ Features

- **Interactive Gallery & Portfolio**: Curated project showcases with smooth GSAP animations and filtering capabilities
- **Service Breakdown**: Detailed overview of spatial design, material sourcing, bespoke joinery, and full project management
- **Client Consultations**: Integrated enquiry management system with local storage persistence
- **Quiet Luxury Aesthetic**: High-contrast dark mode design system built with Playfair Display and Plus Jakarta Sans typography
- **Real-time Responsiveness**: Modern React 19 architecture with instant UI updates and smooth animations
- **Mobile Optimized**: Fully responsive design that maintains the luxury experience across all devices
- **Performance Focused**: Built with Vite for rapid development and optimized production builds

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Bundler & Tooling** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP (ScrollTrigger) & Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |
| **Language Composition** | 98.5% TypeScript |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChiragThakur03/LUMORA---quiet-luxury-interiors.git
   cd LUMORA---quiet-luxury-interiors
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server** (with real-time hot module replacement):
   ```bash
   npm run dev
   ```
   The development server will start on `http://localhost:3000` with HMR enabled for real-time updates.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Lint TypeScript and JSX files (if configured)

### Development Workflow

The project uses **Vite** for ultra-fast development builds with instant HMR (Hot Module Replacement). As you edit components and styles, changes reflect in your browser instantly without full page reloads. TypeScript provides type safety and improved developer experience with full IDE support.

## 📁 Project Structure

```
.
├── src/
│   ├── components/          # React section components
│   │   ├── Header.tsx       # Navigation and branding
│   │   ├── Hero.tsx         # Landing section
│   │   ├── Services.tsx     # Service offerings
│   │   ├── Portfolio.tsx    # Project gallery
│   │   ├── Testimonials.tsx # Client reviews
│   │   └── Footer.tsx       # Footer with contact info
│   ├── data.ts              # Studio projects, services, and testimonial data
│   ├── types.ts             # TypeScript interfaces and types
│   ├── App.tsx              # Main application orchestrator
│   ├── index.css            # Global CSS & Tailwind configuration
│   └── main.tsx             # React root entrypoint
├── public/                  # Static assets (images, fonts)
├── index.html               # HTML document head & font definitions
├── package.json             # Project scripts and dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── .gitignore               # Git ignore rules
```

## 🎨 Design System

### Color Palette
The site uses a refined dark mode color system emphasizing luxury and sophistication:
- **Primary**: Dark backgrounds with high contrast
- **Accent**: Warm, metallic tones
- **Typography**: Playfair Display (headings) + Plus Jakarta Sans (body)

### Animation Guidelines
- **GSAP ScrollTrigger**: Scroll-based animations for dramatic reveals
- **Framer Motion**: Smooth transitions and micro-interactions
- **Performance**: GPU-accelerated transforms for 60fps animations

## 📋 Key Components

### Portfolio Gallery
Interactive project showcase with:
- Image filtering by category
- Smooth hover animations
- Detailed project modals
- Project metadata (timeline, budget, materials)

### Service Showcase
Detailed breakdown of:
- Spatial Design & Planning
- Material Sourcing & Selection
- Bespoke Joinery & Fabrication
- Project Management & Execution

### Client Consultation System
- Enquiry form with validation
- Local storage persistence
- Real-time form feedback
- Email integration ready

## 🚀 Deployment

The project is deployed on **Vercel** for seamless, real-time preview updates.

**Live URL**: https://lumora-interiors.vercel.app/

### Deploy Your Own

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Create a new project and select this repository
4. Vercel will auto-detect the Vite configuration and deploy automatically
5. Configure environment variables if needed
6. Every push to the main branch triggers a new deployment

### Environment Variables

If using backend services or APIs, create a `.env` file in the root directory:
```env
# Example configuration
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

## 🔧 Configuration

### TypeScript
Configured with strict mode enabled for maximum type safety. See `tsconfig.json` for detailed settings.

### Tailwind CSS v4
Custom theme extending default Tailwind with luxury-focused spacing and colors. See `tailwind.config.ts`.

### Vite
Optimized for rapid development and production builds. See `vite.config.ts` for bundler settings.

## 📊 Performance

- **Bundle Size**: Optimized with Vite code splitting
- **Lighthouse Scores**: Consistently high performance metrics
- **Image Optimization**: Lazy loading and responsive images
- **Animations**: GPU-accelerated for smooth 60fps performance

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add feature: description'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a pull request with a clear description

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

For inquiries about interior design services or to learn more about Lumora:

- **Website**: [lumora-interiors.vercel.app](https://lumora-interiors.vercel.app/)
- **GitHub**: [@ChiragThakur03](https://github.com/ChiragThakur03)

---

<div align="center">

**Built with precision and refined taste** ✨

Lumora — Where quiet luxury meets thoughtful design

</div>
