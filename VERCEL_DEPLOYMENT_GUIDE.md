# 🚀 Vercel Deployment Guide - Admin Panel Setup

## ✅ Pre-Deployment Checklist

Your website is ready for deployment! All configurations are in place:
- ✅ Firebase configuration with environment variables support
- ✅ Vercel.json with SPA routing
- ✅ SEO optimization complete
- ✅ Admin panel with authentication
- ✅ Plot management system
- ✅ Inquiry dashboard

---

## 📋 Step-by-Step Deployment Process

### **Step 1: Push Code to GitHub**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment - Shree Krishna Dham Colony"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

---

### **Step 2: Deploy to Vercel**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Click "Deploy"**
   - Wait for initial deployment (2-3 minutes)

---

### **Step 3: Add Environment Variables in Vercel**

This is **CRITICAL** for admin panel to work!

1. **Go to Project Settings**
   - Click on your deployed project
   - Go to "Settings" tab
   - Click "Environment Variables"

2. **Add Firebase Variables**
   
   Add these **7 environment variables** one by one:

   | Variable Name | Value |
   |--------------|-------|
   | `VITE_FIREBASE_API_KEY` | `AIzaSyC7wBmIio92nVi2w8Ft5Gk2HYFAWvzDw2w` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `krishnadham-a4789.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | `krishnadham-a4789` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | `krishnadham-a4789.firebasestorage.app` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `1082927097252` |
   | `VITE_FIREBASE_APP_ID` | `1:1082927097252:web:3b4e85c0a4b3898e394d31` |
   | `VITE_FIREBASE_MEASUREMENT_ID` | `G-7057GRQMKG` |

3. **Select Environment**
   - Check: Production, Preview, Development (all three)

4. **Save Variables**

5. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - ✅ This will rebuild with environment variables

---

### **Step 4: Configure Custom Domain**

1. **Add Domain**
   - Go to "Settings" → "Domains"
   - Add: `shreekrishnadham.in`
   - Add: `www.shreekrishnadham.in`

2. **Update DNS Records**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add these DNS records:

   **For root domain (shreekrishnadham.in):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (5-30 minutes)

---

### **Step 5: Setup Firebase Admin User**

To access the admin panel, you need to create an admin user in Firebase:

#### **Option A: Using Firebase Console (Recommended)**

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select project: `krishnadham-a4789`

2. **Enable Authentication**
   - Click "Authentication" in left sidebar
   - Click "Get Started"
   - Click "Sign-in method" tab
   - Enable "Email/Password"
   - Click "Save"

3. **Create Admin User**
   - Click "Users" tab
   - Click "Add User"
   - Email: `admin@shreekrishnadham.in` (or your preferred email)
   - Password: Create a strong password (save it securely!)
   - Click "Add User"

#### **Option B: Using Firebase CLI**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create admin user (run this in your project directory)
firebase auth:import admin-user.json --project krishnadham-a4789
```

---

### **Step 6: Configure Firebase Security Rules**

1. **Go to Firebase Console**
   - Select project: `krishnadham-a4789`
   - Click "Firestore Database"

2. **Update Security Rules**
   - Click "Rules" tab
   - Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to plots and zones for everyone
    match /plots/{plotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /zones/{zoneId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read access to inquiries only for authenticated users
    match /inquiries/{inquiryId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Allow read access to bookings only for authenticated users
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

3. **Click "Publish"**

---

### **Step 7: Test Admin Panel**

1. **Visit Your Website**
   - Go to: `https://shreekrishnadham.in/admin`
   - Or: `https://your-vercel-url.vercel.app/admin`

2. **Login**
   - Email: `admin@shreekrishnadham.in` (or the email you created)
   - Password: Your admin password

3. **Test Features**
   - ✅ Create location zones
   - ✅ Add plots with coordinates
   - ✅ View inquiries
   - ✅ Update plot status (Available/Sold/Booked)

---

## 🔧 Troubleshooting

### **Admin Panel Not Loading**

**Problem:** Blank page or errors on `/admin` route

**Solution:**
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Redeploy after adding environment variables

### **Login Not Working**

**Problem:** "Wrong email or password" error

**Solution:**
1. Verify Firebase Authentication is enabled
2. Check if admin user exists in Firebase Console
3. Try resetting password in Firebase Console

### **Plots Not Saving**

**Problem:** Error when adding plots

**Solution:**
1. Check Firebase Security Rules
2. Verify Firestore Database is created
3. Check browser console for errors

### **Domain Not Working**

**Problem:** Domain shows error or doesn't load

**Solution:**
1. Wait for DNS propagation (up to 48 hours)
2. Verify DNS records are correct
3. Check domain status in Vercel dashboard

---

## 📱 Admin Panel Features

### **1. Location Zones Management**
- Create zones with custom names
- Set price ranges for each zone
- Define polygon coordinates on sitemap
- Color-coded zones

### **2. Plot Management**
- Add individual plots with coordinates
- Set plot number, area (decimal support), price
- Mark plots as Available/Sold/Booked
- Add owner name for sold plots
- Visual coordinate picker on sitemap

### **3. Inquiry Dashboard**
- View all customer inquiries
- Filter by status (New/Contacted/Converted)
- Contact details with WhatsApp integration
- Mark inquiries as processed

---

## 🔐 Security Best Practices

1. **Change Default Admin Password**
   - Use strong password (12+ characters)
   - Include uppercase, lowercase, numbers, symbols

2. **Enable 2FA (Optional)**
   - Go to Firebase Console → Authentication
   - Enable Multi-factor authentication

3. **Regular Backups**
   - Export Firestore data regularly
   - Keep backup of plot coordinates

4. **Monitor Access**
   - Check Firebase Authentication logs
   - Review unusual login attempts

---

## 📞 Support Contacts

**For Technical Issues:**
- Developer: Kapil Gangwar
- Website: shreekrishnadham.in

**For Business Inquiries:**
- Phone: 8279529681, 7830836785
- WhatsApp: 8279529681

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Project redeployed with env vars
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Firebase Authentication enabled
- [ ] Admin user created
- [ ] Firebase Security Rules updated
- [ ] Admin panel tested
- [ ] Plots can be added/edited
- [ ] Inquiries are being saved
- [ ] Website is live and working

---

## 🎉 You're All Set!

Your website is now live with a fully functional admin panel. You can:
- ✅ Manage plots in real-time
- ✅ Track customer inquiries
- ✅ Update availability instantly
- ✅ Access from anywhere with internet

**Admin Panel URL:** `https://shreekrishnadham.in/admin`

---

**Last Updated:** May 7, 2026
**Version:** 1.0.0
