# Lumora — Quiet Luxury Interiors

Lumora is a bespoke interior design studio focused on quiet luxury, refined finishes, and thoughtful spatial design for high-end residential homes and boutique hospitality spaces.

<img width="956" height="449" alt="image" src="https://github.com/user-attachments/assets/63ba8d6c-0ad6-4f08-ae5d-d938647e7e92" />


## Features

- **Interactive Gallery & Portfolio**: Curated project showcases with smooth GSAP animations and filtering.
- **Service Breakdown**: Detailed overview of spatial design, material sourcing, bespoke joinery, and full project management.
- **Client Consultations**: Integrated enquiry management system with local storage persistence.
- **Quiet Luxury Aesthetic**: High-contrast dark mode design system built with Playfair Display and Plus Jakarta Sans typography.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (ScrollTrigger) & Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn / pnpm / bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lumora-quiet-luxury-interiors.git
   cd lumora-quiet-luxury-interiors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

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

## License

MIT

