# 🏘️ Plot Management System - Complete Guide

## ✅ **System Overview:**

Ab tumhare paas 3-level system hai:

### **Level 1: Zones (लोकेशन ज़ोन)**
- 12 main zones (Zone 1 to Zone 12)
- Har zone ka apna price range, area range, features
- Zone-level status: Available, Partially Booked, Sold Out

### **Level 2: Individual Plots (प्लॉट्स)**
- Har zone ke andar individual plots add kar sakte ho
- Har plot ka unique number (A-101, B-205, etc.)
- Plot-specific coordinates for sitemap display
- Owner name, area, price, status

### **Level 3: Inquiries (इन्क्वायरी)**
- Customer inquiries
- Plot assignment
- Status tracking

---

## 🎯 **Admin Panel - 3 Tabs:**

### **Tab 1: लोकेशन ज़ोन (Location Zones)**
**Purpose:** Manage 12 main zones

**Features:**
- View all 12 zones
- Edit zone details (name, price range, area range, status)
- Update zone coordinates
- Sync all zones to Firebase

**Use Case:**
- Zone 1 ki price update karni hai
- Zone 12 ko "Sold Out" mark karna hai
- Zone features add/remove karne hain

---

### **Tab 2: प्लॉट्स मैनेज करें (Manage Plots)** ⭐ NEW!
**Purpose:** Add individual plots within zones

**Features:**
- ✅ Add new plot with unique number
- ✅ Select zone for plot
- ✅ Set area and price
- ✅ Add owner name (for sold/booked plots)
- ✅ Set coordinates for sitemap display
- ✅ Set label position (X, Y) for plot number
- ✅ Edit existing plots
- ✅ Delete plots
- ✅ Filter by zone, status
- ✅ Search by plot number or owner name

**Stats Dashboard:**
- कुल प्लॉट्स (Total Plots)
- उपलब्ध (Available)
- बुक (Booked)
- बिक गया (Sold)

---

### **Tab 3: इन्क्वायरी (Inquiries)**
**Purpose:** Manage customer inquiries

**Features:**
- View all inquiries
- Assign plots to customers
- Mark as confirmed
- WhatsApp integration

---

## 📝 **How to Add a Plot:**

### **Step 1: Go to "प्लॉट्स मैनेज करें" Tab**

### **Step 2: Click "नया प्लॉट जोड़ें"**

### **Step 3: Fill Plot Details:**

1. **प्लॉट नंबर (Plot Number):** 
   - Example: A-101, B-205, C-310
   - Unique identifier

2. **ज़ोन (Zone):**
   - Select from dropdown (Zone 1 to Zone 12)

3. **क्षेत्रफल (Area):**
   - In sq yd
   - Example: 100, 150, 200

4. **मूल्य (Price):**
   - Total price in rupees
   - Example: 650000 (₹6.5 Lakh)

5. **स्थिति (Status):**
   - उपलब्ध (Available)
   - बुक (Booked)
   - बिक गया (Sold)

6. **मालिक का नाम (Owner Name):**
   - Only for Booked/Sold plots
   - Example: राजेश कुमार

7. **पॉलीगॉन निर्देशांक (Polygon Coordinates):**
   - For sitemap display
   - Format: `x1,y1 x2,y2 x3,y3 x4,y4`
   - Get from CoordinatePicker tool

8. **Label X Position & Label Y Position:**
   - Where to show plot number on sitemap
   - Example: X=500, Y=300

### **Step 4: Click "सेव करें"**

---

## 🗺️ **How to Get Coordinates:**

### **Method 1: Use CoordinatePicker Tool**

1. Go to: `http://localhost:5173/coordinate-picker`
2. Upload sitemap image
3. Click 4 corners of your plot
4. Copy coordinates
5. Paste in "पॉलीगॉन निर्देशांक" field

### **Method 2: Manual Entry**

Format: `x1,y1 x2,y2 x3,y3 x4,y4`

Example for a rectangular plot:
```
500,300 700,300 700,500 500,500
```

This creates a rectangle:
- Top-left: (500, 300)
- Top-right: (700, 300)
- Bottom-right: (700, 500)
- Bottom-left: (500, 500)

---

## 🎨 **Sitemap Display:**

### **What Shows on Website:**

1. **Zones (Background):**
   - Invisible by default
   - Visible on hover (semi-transparent)
   - Click to see zone details

2. **Individual Plots (Foreground):**
   - Always visible with colors:
     - 🟢 Green = Available
     - 🟡 Yellow = Booked
     - 🔴 Red = Sold
   - Plot number displayed at label position
   - Click to see plot details

### **Color Coding:**
- **Available Plots:** Green with 60% opacity
- **Booked Plots:** Yellow with 60% opacity
- **Sold Plots:** Red with 60% opacity
- **White Border:** 3px white stroke around each plot

---

## 💡 **Example Workflow:**

### **Scenario: Zone 1 mein 5 plots bechne hain**

**Step 1: Zone 1 Setup (Already Done)**
- Zone 1 exists with coordinates
- Price range: ₹5,500-6,500/sq yd
- Area range: 80-200 sq yd

**Step 2: Add Plot A-101**
```
Plot Number: A-101
Zone: Zone 1 - Left Side Strip
Area: 100 sq yd
Price: ₹5,50,000
Status: Available
Coordinates: 220,120 350,120 350,250 220,250
Label X: 285
Label Y: 185
```

**Step 3: Add Plot A-102**
```
Plot Number: A-102
Zone: Zone 1 - Left Side Strip
Area: 120 sq yd
Price: ₹6,60,000
Status: Available
Coordinates: 220,260 350,260 350,400 220,400
Label X: 285
Label Y: 330
```

**Step 4: Customer Books A-101**
```
Edit Plot A-101:
Status: Booked → बुक
Owner Name: राजेश कुमार
```

**Step 5: Customer Buys A-102**
```
Edit Plot A-102:
Status: Sold → बिक गया
Owner Name: सुरेश शर्मा
```

**Result on Website:**
- A-101 shows in YELLOW (Booked)
- A-102 shows in RED (Sold)
- Both show plot numbers at specified positions
- Click on plot shows owner details

---

## 🔄 **Real-time Updates:**

### **Admin Panel → Website:**
1. Add/Edit plot in admin panel
2. Click "सेव करें"
3. Refresh website
4. Changes appear on sitemap

### **Automatic Features:**
- Plots load from Firebase
- Colors update based on status
- Owner names show in modal
- Stats update automatically

---

## 📊 **Firebase Collections:**

### **Collection 1: `zones`**
```javascript
{
  id: 'zone-1',
  name: 'Zone 1 - Left Side Strip',
  basePricePerSqYd: { min: 5500, max: 6500 },
  recommendedArea: { min: 80, max: 200 },
  status: 'available',
  polygon: '210,111 366,111 371,1442 196,1397',
  // ... other fields
}
```

### **Collection 2: `plots`** ⭐ NEW!
```javascript
{
  id: 'plot-1234567890',
  plotNumber: 'A-101',
  zoneId: 'zone-1',
  area: 100,
  price: 550000,
  status: 'booked',
  ownerName: 'राजेश कुमार',
  coordinates: '220,120 350,120 350,250 220,250',
  labelX: 285,
  labelY: 185,
  updatedAt: Timestamp
}
```

### **Collection 3: `inquiries`**
```javascript
{
  id: 'inquiry-xyz',
  name: 'Customer Name',
  phone: '9876543210',
  requiredArea: 150,
  status: 'pending',
  // ... other fields
}
```

---

## 🎯 **Best Practices:**

### **Plot Numbering:**
- Use consistent format: `A-101`, `B-205`, `C-310`
- Zone-wise numbering recommended
- Keep it simple and memorable

### **Coordinates:**
- Use CoordinatePicker for accuracy
- Test on sitemap before finalizing
- Keep plots within zone boundaries

### **Label Positioning:**
- Place at center of plot
- Ensure visibility (not too close to edges)
- Test at different zoom levels

### **Status Management:**
- Update status immediately after booking/sale
- Add owner name for sold/booked plots
- Keep records accurate

---

## 🚀 **Launch Checklist:**

### **Before Going Live:**
- [ ] All zones configured
- [ ] Sample plots added for testing
- [ ] Coordinates verified on sitemap
- [ ] Colors displaying correctly
- [ ] Plot numbers visible
- [ ] Modal popups working
- [ ] Owner names showing for sold plots
- [ ] Mobile responsive tested
- [ ] Firebase rules updated

### **Firebase Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Zones - Public read, admin write
    match /zones/{zone} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Plots - Public read, admin write
    match /plots/{plot} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Inquiries - Anyone can create, only admin can read/update
    match /inquiries/{inquiry} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## 🎉 **You're Ready!**

Ab tumhare paas complete plot management system hai:
- ✅ Zone-based organization
- ✅ Individual plot tracking
- ✅ Visual sitemap display
- ✅ Owner management
- ✅ Real-time updates
- ✅ Mobile responsive
- ✅ Admin panel control

**Happy Selling! 🏘️💰**
