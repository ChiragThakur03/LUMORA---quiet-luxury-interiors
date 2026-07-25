# Lumora — Quiet Luxury Interiors

Lumora is a bespoke interior design studio focused on quiet luxury, refined finishes, and thoughtful spatial design for high-end residential homes and boutique hospitality spaces.

<img width="956" height="449" alt="image" src="https://github.com/user-attachments/assets/63ba8d6c-0ad6-4f08-ae5d-d938647e7e92" />

## 🌐 Live Preview

Experience the Lumora studio platform live:

**[🚀 View Live Demo](https://lumora-interiors.vercel.app/)**

The site features real-time interactive components with smooth animations, dynamic galleries, and a seamless client consultation experience. Deployed on Vercel with continuous integration.

## Features

- **Interactive Gallery & Portfolio**: Curated project showcases with smooth GSAP animations and filtering.
- **Service Breakdown**: Detailed overview of spatial design, material sourcing, bespoke joinery, and full project management.
- **Client Consultations**: Integrated enquiry management system with local storage persistence.
- **Quiet Luxury Aesthetic**: High-contrast dark mode design system built with Playfair Display and Plus Jakarta Sans typography.
- **Real-time Responsiveness**: Modern React 19 architecture with instant UI updates and smooth animations.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (ScrollTrigger) & Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (with real-time preview updates)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn / pnpm / bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChiragThakur03/LUMORA---quiet-luxury-interiors.git
   cd LUMORA---quiet-luxury-interiors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server (with real-time preview):
   ```bash
   npm run dev
   ```
   The development server will start on `http://localhost:3000` with hot module replacement enabled for real-time updates.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

### Development Workflow

The project uses **Vite** for ultra-fast development builds with instant HMR (Hot Module Replacement). As you edit components and styles, changes reflect in your browser instantly without full page reloads.

## Project Structure

```
.
├── src/
│   ├── components/      # React section components (Header, Hero, Services, Portfolio, etc.)
│   ├── data.ts          # Studio projects, services, and testimonial data
│   ├── types.ts         # TypeScript definitions
│   ├── App.tsx          # Main application orchestrator
│   ├── index.css        # Global CSS & Tailwind configuration
│   └── main.tsx         # React root entrypoint
├── index.html           # Document head & font definitions
├── package.json         # Project scripts and dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite bundler configuration
```

## Deployment

The project is deployed on **Vercel** for seamless, real-time preview updates. Every push to the main branch automatically triggers a new deployment.

**Live URL**: https://lumora-interiors.vercel.app/

### Deploy Your Own

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Create a new project and select this repository
4. Vercel will auto-detect the Vite configuration and deploy automatically

## License

MIT
