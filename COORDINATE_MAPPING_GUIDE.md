# 🎯 Coordinate Mapping Guide

## ✅ **CoordinatePicker Tool Ready!**

### **How to Use:**

1. **Start the development server:**
```bash
npm run dev
```

2. **Open the Coordinate Picker:**
```
http://localhost:5173/coordinate-picker
```

3. **Map Each Zone:**

---

## 📍 **Zones to Map (in order):**

### **Zone 1: Top Left Area - Road 24-0' Wide**
- **Location:** Top left corner of sitemap
- **Boundaries:** 
  - Top: Top edge
  - Left: Left edge  
  - Right: First vertical road (Road 24-0')
  - Bottom: First horizontal road (Road 16-0')
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 2: Top Right Area - Road 15-0' Wide**
- **Location:** Top right section
- **Boundaries:**
  - Top: Top edge
  - Left: After Road 24-0'
  - Right: Before Chakwarg path
  - Bottom: First horizontal road (Road 16-0')
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 3: Middle Left Column - Road 24-0' Wide**
- **Location:** Left column, middle section
- **Boundaries:**
  - Top: After Road 16-0'
  - Left: Left edge
  - Right: Road 24-0' (vertical)
  - Bottom: Before Road 25-0'
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 4: Middle Center Column - Road 16-0' Wide**
- **Location:** Center column, middle section
- **Boundaries:**
  - Top: After Road 16-0'
  - Left: After Road 24-0'
  - Right: Before Road 15-0'
  - Bottom: Before Road 25-0'
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 5: Middle Right Column - Road 15-0' Wide**
- **Location:** Right column, middle section
- **Boundaries:**
  - Top: After Road 16-0'
  - Left: After center column
  - Right: Before Chakwarg path
  - Bottom: Before Road 25-0'
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 6: Bottom Large Area - Road 25-0' Wide**
- **Location:** Bottom section (largest area)
- **Boundaries:**
  - Top: After middle columns
  - Left: Left edge
  - Right: Before Chakwarg path
  - Bottom: Before Nadeli Bahapur Road
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 7: Right Side - Chakwarg Narrow Path**
- **Location:** Right side vertical strip
- **Boundaries:**
  - Top: Top edge
  - Left: After main plots
  - Right: Before Nadeli Bahapur Road
  - Bottom: Where it meets Zone 8
- **Click Order:** Top-left → Top-right → Bottom-right → Bottom-left

---

### **Zone 8: Nadeli Bahapur Road - Main Road Frontage**
- **Location:** Bottom-right diagonal section
- **Boundaries:**
  - Diagonal road frontage
  - This is a **trapezoid/irregular shape**
- **Click Order:** Follow the road boundary clockwise
- **Note:** This zone has 4-5 points (not a perfect rectangle)

---

## 🎯 **Step-by-Step Process:**

### **For Each Zone:**

1. **Enter Zone Name:**
   - Type in the input field (e.g., "Zone 1 - Top Left")

2. **Click Corners:**
   - Click on image at each corner
   - **Always go CLOCKWISE**
   - Start from **top-left corner**
   - Points will show as numbered circles
   - Polygon will draw automatically

3. **Verify:**
   - Check if polygon covers the correct area
   - If wrong, click "Clear" (trash icon) and start again

4. **Save:**
   - Click "Save Zone" button
   - Zone will appear in "Saved Zones" list

5. **Repeat:**
   - Clear points
   - Enter next zone name
   - Map next zone

6. **Export:**
   - After all 8 zones mapped
   - Click "Export All Zones"
   - Downloads `zone-coordinates.json`

---

## 📝 **Tips for Accurate Mapping:**

### **General:**
- ✅ Zoom in browser if needed (Ctrl/Cmd + Plus)
- ✅ Click exactly on corners
- ✅ Always go clockwise
- ✅ Start from top-left
- ✅ Be precise - coordinates matter!

### **For Rectangular Zones (1-7):**
- 4 points only
- Perfect rectangles
- Easy to map

### **For Irregular Zone (8):**
- May need 4-5 points
- Follow road boundary
- Take your time

---

## 🔄 **After Mapping:**

### **1. Copy Coordinates:**

Open the exported `zone-coordinates.json` file.

It will look like:
```json
[
  {
    "name": "Zone 1 - Top Left",
    "polygon": "100,50 400,50 400,300 100,300"
  },
  {
    "name": "Zone 2 - Top Right",
    "polygon": "450,50 850,50 850,300 450,300"
  }
  // ... etc
]
```

### **2. Update SVGPlotOverlay.jsx:**

Open: `src/components/SVGPlotOverlay.jsx`

Find the `locationZones` array (around line 30)

Update each zone's `polygon` property:

```javascript
{
  id: 'zone-1',
  name: 'Top Left Area - Road 24-0\' Wide',
  // ... other properties
  polygon: '100,50 400,50 400,300 100,300' // ← Paste here
}
```

### **3. Test:**

```bash
npm run dev
```

Go to main website, scroll to "कॉलोनी लेआउट"

- Hover over zones - should highlight correctly
- Click zones - should open modal
- Verify all 8 zones work

---

## ⚠️ **Common Mistakes:**

### **Wrong Click Order:**
❌ Random clicking
✅ Always clockwise from top-left

### **Missing Corners:**
❌ Clicking inside the zone
✅ Click exactly on corners

### **Overlapping Zones:**
❌ Zones overlap each other
✅ Each zone should be distinct

### **Wrong Zone Boundaries:**
❌ Including roads in zone
✅ Zone should be the plot area only (not roads)

---

## 🎨 **Visual Reference:**

```
┌─────────────────────────────────────┐
│  Zone 1    │    Zone 2      │ Z7   │
│  (Top L)   │    (Top R)     │ o    │
│            │                │ n    │
├────────────┼────────┬───────┤ e    │
│            │        │       │      │
│  Zone 3    │ Zone 4 │ Zone │ 7    │
│  (Mid L)   │ (Mid C)│  5   │      │
│            │        │(Mid R)│      │
├────────────┴────────┴───────┤      │
│                             │      │
│      Zone 6 (Bottom)        │      │
│                             │      │
└─────────────────────────────┴──────┘
              ╲
               ╲ Zone 8
                ╲ (Diagonal)
```

---

## ✅ **Checklist:**

Before starting:
- [ ] Development server running
- [ ] CoordinatePicker opened
- [ ] Image loaded correctly
- [ ] Image dimensions showing

For each zone:
- [ ] Zone name entered
- [ ] 4 corners clicked (clockwise)
- [ ] Polygon looks correct
- [ ] Zone saved

After all zones:
- [ ] 8 zones saved
- [ ] Exported JSON file
- [ ] Coordinates copied to SVGPlotOverlay.jsx
- [ ] Tested on main website
- [ ] All zones clickable
- [ ] Modals showing correct info

---

## 🚀 **Estimated Time:**

- Zone 1-7 (rectangles): ~2 min each = 14 min
- Zone 8 (irregular): ~5 min
- Testing & adjustments: ~10 min
- **Total: ~30 minutes**

---

## 💡 **Pro Tips:**

1. **Do it in one sitting** - Don't close browser
2. **Save frequently** - After each zone
3. **Double-check** - Verify before moving to next
4. **Test immediately** - After updating code
5. **Keep backup** - Save JSON file safely

---

## 📞 **Need Help?**

If coordinates not working:
1. Check if clockwise
2. Check if 4 points (except Zone 8)
3. Check if no extra spaces in polygon string
4. Check if commas and spaces correct format

---

**Bhai, ab tool ready hai! Bas open karo aur map karo! 🎯**

**URL:** `http://localhost:5173/coordinate-picker`

**Good luck! 💪**
