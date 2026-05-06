# Shree Krishna Dham Colony - Premium Real Estate Website

A stunning 3D interactive real estate website for Shree Krishna Dham Colony, featuring an immersive 3D walkthrough, interactive plot map, and lead generation tools.

## 🌟 Features

- **3D Virtual Walkthrough**: Interactive Three.js 3D colony visualization with 116+ plots
- **Interactive Plot Map**: Color-coded plot availability with real-time filtering
- **Hero Section**: Animated landing page with gradient background and floating particles
- **About Section**: Project highlights and developer credibility
- **Amenities**: Modern facilities showcase
- **Location**: Google Maps integration with distance markers
- **Gallery**: Image lightbox with video tour
- **Pricing**: EMI calculator and flexible payment plans
- **Contact Form**: Lead generation with WhatsApp integration
- **WhatsApp Button**: Floating quick-message widget
- **Fully Responsive**: Mobile-first design

## 🛠️ Tech Stack

- **Frontend**: React.js 18 + Vite
- **Styling**: Tailwind CSS 3
- **3D Engine**: Three.js + React Three Fiber + Drei
- **Animation**: GSAP + Framer Motion
- **Icons**: Lucide React
- **Backend**: Node.js + Express (for lead forms)
- **Database**: Supabase (for storing inquiries)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shree-krishna-dham-colony
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Update Plot Data
Edit `src/data/plotData.js` to modify:
- Plot positions, sizes, and prices
- Plot availability status (available/sold/booked)
- Road configurations
- Plot statistics

### Update Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  saffron: '#E8651A',  // Primary color
  ivory: '#FAF6EF',    // Background
  gold: '#C9A84C',     // Accent
  charcoal: '#1A1A2E', // Dark text
}
```

### Update Contact Information
- WhatsApp number: Search for `919876543210` and replace
- Email: Search for `info@shreekrishnadham.com` and replace
- Address: Update in Footer and ContactForm components

### Update Images
Replace placeholder images in:
- `src/components/Gallery.jsx` - Update image URLs
- Add actual site photos and rendered views

## 📱 WhatsApp Integration

The website includes WhatsApp integration for:
- Direct plot inquiries
- Quick message templates
- Form submission notifications

Update the phone number in:
- `src/components/WhatsAppButton.jsx`
- `src/components/Walkthrough3D.jsx`
- `src/components/InteractivePlotMap.jsx`
- `src/components/ContactForm.jsx`

## 🗺️ Google Maps

Update the Google Maps embed URL in `src/components/Location.jsx` with your actual colony coordinates.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

### Manual Hosting
```bash
npm run build
# Upload 'dist' folder to your hosting provider
```

## 📊 Supabase Setup (Optional)

1. Create a Supabase project at https://supabase.com
2. Create a `leads` table with columns:
   - id (uuid, primary key)
   - name (text)
   - phone (text)
   - email (text)
   - city (text)
   - plot_interest (text)
   - budget (text)
   - message (text)
   - created_at (timestamp)

3. Add Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Update `src/components/ContactForm.jsx` to use Supabase client

## 🎯 Performance Optimization

- Images are lazy-loaded
- 3D scene uses efficient low-poly models
- Code splitting with React.lazy (can be added)
- Tailwind CSS purges unused styles in production

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For support, email: info@shreekrishnadham.com
Phone: +91 98765 43210

---

**Built with ❤️ for Real Estate Excellence**
