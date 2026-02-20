# Physiotherapie Corpus Omnia - Website Redesign

Modern, responsive website for Physiotherapie Corpus Omnia built with Next.js 14, TypeScript, and shadcn/ui design system.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design using shadcn/ui (New York style)
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Smooth Animations**: Scroll-triggered animations using Framer Motion
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized with Next.js 14 App Router and static site generation
- **SEO-Friendly**: Proper meta tags and semantic HTML structure

## 📋 Sections

All sections from the original website have been preserved and modernized:

- **Hero**: Eye-catching introduction with CTA buttons
- **Benefits**: Showcase advantages with animated statistics counter (1000+ patients)
- **Availability**: Highlight no waiting list and multiple booking options
- **Opening Hours**: Flexible appointment scheduling information
- **Quote**: Mission statement emphasizing evidence-based therapy
- **Expertise**: Accordion-based display of 14+ specialized services
- **Location**: Interactive Google Maps integration with directions
- **Contact**: Validated contact form with toast notifications
- **Team**: Team member profiles with qualifications and languages
- **Practice**: Gallery and floor plan with welcome message
- **Footer**: Quick links, social media, and legal pages

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (New York style)
- **Animations**: Framer Motion
- **Theme**: next-themes for dark mode
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
physiotherapie-corpusomnia/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Home page with all sections
│   ├── agb/page.tsx           # Terms & Conditions
│   ├── datenschutz/page.tsx   # Privacy Policy
│   └── impressum/page.tsx     # Imprint
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── sections/               # Page sections
│   │   ├── hero.tsx
│   │   ├── benefits.tsx
│   │   ├── availability.tsx
│   │   ├── opening-hours.tsx
│   │   ├── quote.tsx
│   │   ├── expertise.tsx
│   │   ├── location.tsx
│   │   ├── contact.tsx
│   │   ├── team.tsx
│   │   ├── practice.tsx
│   │   └── footer.tsx
│   ├── navigation/             # Navigation components
│   │   ├── navbar.tsx
│   │   └── mobile-nav.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   └── data/
│       ├── services.ts         # All 14+ service descriptions
│       └── team.ts             # Team member data
└── public/
    └── images/                 # Static images (to be added)
```

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the color scheme. The project uses CSS variables for theming.

### Content

Update content in the data files:
- `lib/data/services.ts` - All service descriptions (Allgemeine Physiotherapie, Geriatrie, Orthopädie, etc.)
- `lib/data/team.ts` - Team member information and qualifications

### Components

All sections are modular components in `components/sections/`. Edit individual components to customize layouts and content.

## 📱 Responsive Design

- **Mobile**: < 768px - Mobile-optimized navigation with sheet menu
- **Tablet**: 768px - 1024px - Adjusted layouts for medium screens
- **Desktop**: > 1024px - Full desktop experience

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles throughout
- Full keyboard navigation support
- Focus visible states on interactive elements
- Screen reader compatible
- Skip to content link
- Color contrast meeting WCAG AA standards

## 🚀 Deployment to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js and configure optimal settings
4. Click "Deploy"

Your site will be live in minutes!

## 📝 Next Steps

To complete the website, consider:

1. **Add Images**: 
   - Replace placeholder logo in Hero section
   - Add team member photo (Goncagül Erol)
   - Add practice photos to gallery
   - Add floor plan image

2. **Connect Contact Form**: 
   - Set up email service (SendGrid, Resend, etc.)
   - Configure form submission endpoint
   - Add CAPTCHA if needed

3. **SEO Optimization**:
   - Add robots.txt
   - Create sitemap.xml
   - Add Open Graph images
   - Configure analytics

4. **Additional Features**:
   - Patient testimonials section
   - Blog/news section
   - Multi-language support (EN, TR)
   - Integration with booking system API

## 📞 Contact

For questions or support:
- **Email**: info@physiotherapie-corpusomnia.ch
- **Phone**: +41 76 681 70 31
- **Address**: Industriestrasse 24, 8305 Dietlikon

---

Built with Next.js 14 and shadcn/ui
