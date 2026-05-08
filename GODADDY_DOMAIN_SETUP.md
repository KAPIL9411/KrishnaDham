# 🌐 GoDaddy Domain Setup Guide - shreekrishnadham.in

## ✅ Prerequisites
- ✅ Domain purchased: shreekrishnadham.in (GoDaddy)
- ✅ Website deployed on Vercel
- ⏱️ Time required: 10 minutes
- ⏳ DNS propagation: 5 minutes to 48 hours

---

## 📋 Step-by-Step Process

### **PART 1: Vercel में Domain Add करें** (5 minutes)

#### Step 1: Vercel Dashboard खोलें
1. Go to: https://vercel.com
2. अपनी project पर click करें (KrishnaDham)
3. **"Settings"** tab पर जाएं
4. Left sidebar में **"Domains"** पर click करें

#### Step 2: Domain Add करें
1. **"Add Domain"** button पर click करें
2. Type करें: `shreekrishnadham.in`
3. **"Add"** button पर click करें

#### Step 3: www Subdomain भी Add करें
1. फिर से **"Add Domain"** पर click करें
2. Type करें: `www.shreekrishnadham.in`
3. **"Add"** button पर click करें

#### Step 4: DNS Records Copy करें
Vercel आपको 2 options देगा:

**Option A: Nameservers (Recommended - आसान)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: A Record + CNAME (Alternative)**
```
A Record:
Type: A
Name: @
Value: 76.76.21.21

CNAME Record:
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

### **PART 2: GoDaddy में DNS Update करें** (5 minutes)

#### Method 1: Nameservers Use करें (सबसे आसान - Recommended)

##### Step 1: GoDaddy Login करें
1. Go to: https://www.godaddy.com
2. अपने account में login करें
3. **"My Products"** पर जाएं
4. **"Domains"** section में जाएं

##### Step 2: Domain Manage करें
1. `shreekrishnadham.in` के सामने **"DNS"** या **"Manage"** पर click करें
2. **"Nameservers"** section ढूंढें
3. **"Change"** या **"Manage"** button पर click करें

##### Step 3: Nameservers Update करें
1. **"Enter my own nameservers"** या **"Custom"** select करें
2. पुराने nameservers हटाएं
3. नए nameservers add करें:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. **"Save"** button पर click करें

✅ **Done!** अब 5 minutes से 48 hours तक wait करें

---

#### Method 2: A Record और CNAME Use करें (Alternative)

##### Step 1: GoDaddy DNS Management
1. GoDaddy login करें
2. **"My Products"** → **"Domains"**
3. `shreekrishnadham.in` के सामने **"DNS"** पर click करें

##### Step 2: A Record Add करें
1. **"DNS Records"** section में जाएं
2. **"Add"** button पर click करें
3. Fill करें:
   - **Type:** A
   - **Name:** @ (या blank छोड़ें)
   - **Value:** `76.76.21.21`
   - **TTL:** 600 seconds (या default)
4. **"Save"** पर click करें

##### Step 3: CNAME Record Add करें
1. फिर से **"Add"** button पर click करें
2. Fill करें:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 600 seconds
3. **"Save"** पर click करें

##### Step 4: पुराने Records Delete करें (अगर हैं)
- पुराने A records (@ के लिए) delete करें
- पुराने CNAME records (www के लिए) delete करें
- **Parking page** records delete करें

✅ **Done!** अब wait करें

---

## ⏳ DNS Propagation Check करें

### कब तक wait करना होगा?
- **Minimum:** 5-10 minutes
- **Average:** 1-2 hours
- **Maximum:** 48 hours (rare)

### Check करने के तरीके:

#### Method 1: Browser में Check करें
1. 10 minutes wait करें
2. Browser में जाएं: `https://shreekrishnadham.in`
3. अगर website दिखे तो ✅ Done!

#### Method 2: Online Tool Use करें
1. Go to: https://dnschecker.org
2. Enter: `shreekrishnadham.in`
3. Check करें कि सभी locations में propagate हुआ या नहीं

#### Method 3: Terminal से Check करें
```bash
# A Record check करें
dig shreekrishnadham.in

# CNAME check करें
dig www.shreekrishnadham.in

# Nameservers check करें
dig NS shreekrishnadham.in
```

---

## ✅ Verification Checklist

### Vercel में Check करें:
- [ ] Domain added: shreekrishnadham.in
- [ ] www subdomain added: www.shreekrishnadham.in
- [ ] Status shows: "Valid Configuration" या "Pending"
- [ ] SSL certificate status: "Issued" (थोड़ा time लगेगा)

### GoDaddy में Check करें:
- [ ] Nameservers updated (या A/CNAME records added)
- [ ] पुराने parking records deleted
- [ ] Changes saved successfully

### Browser में Check करें:
- [ ] https://shreekrishnadham.in खुलता है
- [ ] https://www.shreekrishnadham.in खुलता है
- [ ] SSL certificate active (🔒 lock icon)
- [ ] Website properly loads
- [ ] Admin panel accessible: /admin

---

## 🔧 Troubleshooting

### ❌ Problem: Domain नहीं खुल रहा

**Solution 1: Wait करें**
- DNS propagation में time लगता है
- 1-2 hours wait करें
- फिर try करें

**Solution 2: Browser Cache Clear करें**
```
Chrome: Ctrl+Shift+Delete (या Cmd+Shift+Delete on Mac)
Safari: Cmd+Option+E
```

**Solution 3: DNS Records Verify करें**
- GoDaddy में जाकर check करें
- Correct values enter किए हैं या नहीं
- Typos check करें

---

### ❌ Problem: SSL Certificate Error

**Solution:**
- Vercel automatically SSL certificate issue करता है
- 10-30 minutes wait करें
- अगर फिर भी issue हो तो:
  1. Vercel → Settings → Domains
  2. Domain के सामने "..." click करें
  3. "Refresh SSL Certificate" select करें

---

### ❌ Problem: www नहीं खुल रहा

**Solution:**
- CNAME record check करें
- Value: `cname.vercel-dns.com` (correct spelling)
- Name: `www` (@ नहीं)
- Save करके 10 minutes wait करें

---

### ❌ Problem: GoDaddy में Nameservers Change नहीं हो रहे

**Solution:**
- Domain lock check करें (unlock करें)
- Domain transfer lock हटाएं
- 24 hours wait करें (नया domain है तो)
- GoDaddy support से contact करें

---

## 🎯 Quick Reference

### Vercel DNS Values:

**Nameservers:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

---

## 📱 After Domain is Live

### Test करें:
1. ✅ https://shreekrishnadham.in
2. ✅ https://www.shreekrishnadham.in
3. ✅ https://shreekrishnadham.in/admin
4. ✅ SSL certificate (🔒 icon)
5. ✅ All pages working
6. ✅ Forms submitting
7. ✅ WhatsApp buttons working

### Update करें:
1. Google Search Console में domain add करें
2. Google Analytics setup करें (optional)
3. Facebook Business Manager में domain verify करें (optional)

---

## 🎉 Success!

अब आपकी website live है:
- 🌐 **Main URL:** https://shreekrishnadham.in
- 🔐 **Admin Panel:** https://shreekrishnadham.in/admin
- 📱 **Mobile Friendly:** Yes
- 🔒 **SSL Secure:** Yes

---

## 📞 Need Help?

### GoDaddy Support:
- Phone: 1800-123-8888 (India)
- Chat: https://www.godaddy.com/contact-us

### Vercel Support:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Developer:
- Name: Kapil Gangwar
- Phone: 8279529681, 7830836785
- Email: admin@shreekrishnadham.in

---

## 📚 Additional Resources

- [Vercel Custom Domains Guide](https://vercel.com/docs/concepts/projects/custom-domains)
- [GoDaddy DNS Management](https://www.godaddy.com/help/manage-dns-680)
- [DNS Propagation Checker](https://dnschecker.org)

---

**Last Updated:** May 7, 2026
**Domain:** shreekrishnadham.in
**Status:** Ready to Configure

🚀 **Follow the steps above to make your website live!** 🚀
