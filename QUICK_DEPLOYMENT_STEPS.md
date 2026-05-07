# ⚡ Quick Deployment Steps - Admin Panel

## 🚀 5-Minute Setup

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Deploy Shree Krishna Dham"
git push origin main
```

### 2️⃣ Deploy on Vercel
1. Go to https://vercel.com
2. Import your GitHub repo
3. Click "Deploy"

### 3️⃣ Add Environment Variables
Go to Vercel → Settings → Environment Variables

**Copy-paste these 7 variables:**

```
VITE_FIREBASE_API_KEY=AIzaSyC7wBmIio92nVi2w8Ft5Gk2HYFAWvzDw2w
VITE_FIREBASE_AUTH_DOMAIN=krishnadham-a4789.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=krishnadham-a4789
VITE_FIREBASE_STORAGE_BUCKET=krishnadham-a4789.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1082927097252
VITE_FIREBASE_APP_ID=1:1082927097252:web:3b4e85c0a4b3898e394d31
VITE_FIREBASE_MEASUREMENT_ID=G-7057GRQMKG
```

### 4️⃣ Redeploy
- Go to Deployments tab
- Click "Redeploy" on latest deployment

### 5️⃣ Create Admin User
1. Go to https://console.firebase.google.com
2. Select project: `krishnadham-a4789`
3. Click "Authentication" → "Get Started"
4. Enable "Email/Password"
5. Click "Users" → "Add User"
6. Email: `admin@shreekrishnadham.in`
7. Password: (your secure password)

### 6️⃣ Update Firebase Rules
Go to Firestore Database → Rules → Copy this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /plots/{plotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /zones/{zoneId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /inquiries/{inquiryId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

Click "Publish"

---

## ✅ Done!

**Admin Panel:** `https://your-site.vercel.app/admin`

**Login with:**
- Email: admin@shreekrishnadham.in
- Password: (your password)

---

## 🔧 If Something Doesn't Work

1. **Check environment variables** are added in Vercel
2. **Redeploy** after adding env vars
3. **Enable Firebase Authentication** (Email/Password)
4. **Create admin user** in Firebase Console
5. **Update Firestore rules** to allow read/write

---

## 📞 Need Help?

**Developer:** Kapil Gangwar
**Phone:** 8279529681, 7830836785

---

**Full Guide:** See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions
