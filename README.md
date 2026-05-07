# 🏘️ Shree Krishna Dham Colony - Premium Real Estate Website

A modern, feature-rich real estate website for **Shree Krishna Dham Colony** in Baheri, Bareilly with a powerful admin panel for real-time plot management.

## 🌟 Features

### 🎯 Customer-Facing Features
- ✅ **Interactive Sitemap** - Click on zones and plots to see details
- ✅ **Real-time Availability** - Live plot status updates
- ✅ **Quick Booking** - Instant WhatsApp integration
- ✅ **Plot Inquiry Form** - Direct customer inquiries
- ✅ **Video Walkthrough** - Virtual site tour
- ✅ **Dynamic Testimonials** - Real owner reviews
- ✅ **Location Details** - Accurate distances to key locations
- ✅ **Mobile Responsive** - Perfect on all devices
- ✅ **SEO Optimized** - Ranks for "shree krishna dham colony baheri"

### 🔐 Admin Panel Features
- ✅ **Zone Management** - Create location zones with custom pricing
- ✅ **Plot Management** - Add/edit plots with precise coordinates
- ✅ **Inquiry Dashboard** - Track and manage customer inquiries
- ✅ **Visual Coordinate Picker** - Click on sitemap to mark locations
- ✅ **Status Management** - Available/Sold/Booked tracking
- ✅ **Owner Records** - Track plot owners
- ✅ **Secure Authentication** - Firebase-based login

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS 3
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore + Authentication)
- **Deployment**: Vercel
- **Domain**: shreekrishnadham.in

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd new-3d
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
```

### 4. Start development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) | Complete overview & next steps |
| [QUICK_DEPLOYMENT_STEPS.md](QUICK_DEPLOYMENT_STEPS.md) | 5-minute deployment guide |
| [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) | Detailed deployment instructions |
| [ADMIN_PANEL_GUIDE.md](ADMIN_PANEL_GUIDE.md) | How to use admin panel |
| [POST_DEPLOYMENT_CHECKLIST.md](POST_DEPLOYMENT_CHECKLIST.md) | Verification checklist |

## 🚀 Quick Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all Firebase credentials (see `.env.example`)
   - Redeploy

4. **Setup Firebase**
   - Enable Authentication (Email/Password)
   - Create admin user
   - Update Firestore security rules (see `firestore.rules`)

**Full guide:** [QUICK_DEPLOYMENT_STEPS.md](QUICK_DEPLOYMENT_STEPS.md)

## 🔧 Configuration

### Environment Variables

Create `.env.local` file with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

See `.env.example` for the actual values.

### Firebase Setup

1. **Enable Authentication**
   - Go to Firebase Console
   - Enable Email/Password authentication
   - Create admin user

2. **Update Security Rules**
   - Copy content from `firestore.rules`
   - Paste in Firestore Database → Rules
   - Publish

3. **Create Collections**
   - `plots` - For plot data
   - `zones` - For location zones
   - `inquiries` - For customer inquiries
   - `bookings` - For quick bookings

## 🎯 Admin Panel Access

### Local Development
- **URL:** http://localhost:5173/admin
- **Login:** Use Firebase credentials

### Production
- **URL:** https://shreekrishnadham.in/admin
- **Login:** admin@shreekrishnadham.in

### Admin Features
1. **Location Zones** - Create zones with custom pricing
2. **Plot Management** - Add/edit plots with coordinates
3. **Inquiry Dashboard** - View and manage inquiries

**Full guide:** [ADMIN_PANEL_GUIDE.md](ADMIN_PANEL_GUIDE.md)

## 🎨 Customization

### Update Contact Numbers
Current numbers: 8279529681, 7830836785, 6396913427, 9917732395

Search and replace in:
- `src/components/Navbar.jsx`
- `src/components/Hero.jsx`
- `src/components/Footer.jsx`
- `src/components/WhatsAppButton.jsx`
- `src/components/ContactForm.jsx`

### Update Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  saffron: '#E8651A',  // Primary color
  ivory: '#FAF6EF',    // Background
  gold: '#C9A84C',     // Accent
  charcoal: '#1A1A2E', // Dark text
}
```

### Update Sitemap Image
Replace `public/newSitemap.png` with your sitemap image.

### Update Video Tour
Edit YouTube link in `src/components/VideoWalkthrough.jsx`

## 📱 Features Breakdown

### Interactive Sitemap
- Click on zones to see price ranges
- Click on plots to see details
- Color-coded status (Green/Red/Yellow)
- Sold plots show owner name (no price)

### Quick Booking
- 4-field form (Name, Phone, Plot Preference, Budget)
- Instant WhatsApp integration
- Success animation
- ₹5,000 token amount

### Plot Inquiry
- Detailed inquiry form
- Saves to Firebase
- Admin can view in dashboard
- WhatsApp notification

### Admin Dashboard
- Real-time plot updates
- Visual coordinate picker
- Inquiry management
- Status tracking

## 🔐 Security

- Firebase Authentication for admin access
- Firestore security rules restrict write access
- Environment variables for sensitive data
- HTTPS enforced on Vercel
- No API keys exposed in frontend

## 📊 SEO Features

- ✅ Custom favicon
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URL

**Target keyword:** "shree krishna dham colony baheri"

## 🐛 Troubleshooting

### Admin panel not working
- Check environment variables in Vercel
- Verify Firebase Authentication is enabled
- Check Firestore security rules

### Plots not saving
- Verify Firebase connection
- Check browser console for errors
- Ensure coordinates are saved

### Forms not submitting
- Check Firebase Firestore rules
- Verify network connection
- Check browser console

**Full troubleshooting:** [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)

## 📞 Contact

**Business Inquiries:**
- Phone: 8279529681, 7830836785
- WhatsApp: 8279529681
- Website: shreekrishnadham.in

**Developer:**
- Kapil Gangwar
- Email: admin@shreekrishnadham.in

## 🎓 Previous Projects

- Ashok Vihar Colony, Baheri
- Brij Dham Colony, Baheri
- Gandhi Ashram, Baheri

## 📄 License

© 2026 Shree Krishna Dham Colony. All rights reserved.

## 🙏 Acknowledgments

**Location:** Baheri, Bareilly, Uttar Pradesh
**Designed & Developed with ❤️ by Kapil Gangwar**

---

## ✅ Ready to Deploy?

1. Read [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) for overview
2. Follow [QUICK_DEPLOYMENT_STEPS.md](QUICK_DEPLOYMENT_STEPS.md) for setup
3. Use [POST_DEPLOYMENT_CHECKLIST.md](POST_DEPLOYMENT_CHECKLIST.md) to verify

**Time to deploy:** ~30 minutes
**Time to master admin:** ~1 hour

🚀 **Let's launch Shree Krishna Dham Colony!** 🚀
