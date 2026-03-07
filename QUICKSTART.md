# 🏮 LANTERN CITY PORTFOLIO - QUICK START GUIDE

## What You've Got

A complete, production-ready portfolio website with:

✅ **5 Pages**: Home, About, Projects, Skills, Contact  
✅ **Immersive Animations**: Day/night sky cycle, parallax skyline, floating lanterns  
✅ **100% Responsive**: Perfect on mobile, tablet, desktop  
✅ **Zero Dependencies**: Pure HTML, CSS, JavaScript  
✅ **Pre-filled Content**: 5 example projects, skills, biography  

---

## 🚀 Get Started in 3 Steps

### Step 1: Open the Website
1. Open `index.html` in your web browser
2. Enjoy the immersive experience!

### Step 2: Customize Your Content
**Essential changes** (search for these and replace):

1. **Your Name**: Replace "captaincto" everywhere
2. **Your Bio**: Update the about section text
3. **Your Projects**: Replace the 5 example projects with your own
4. **Your Skills**: Update skill levels and add your technologies
5. **Contact Info**: Add your real email, LinkedIn, GitHub, Twitter

### Step 3: Deploy
Upload to:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)

See README.md for detailed deployment instructions.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Start here (Homepage)
├── about.html          ← Your story
├── projects.html       ← Your work
├── skills.html         ← Your capabilities
├── contact.html        ← Get in touch form
├── css/
│   ├── styles.css      ← Main styles & animations
│   └── pages.css       ← Inner page styles
├── js/
│   ├── main.js         ← Core animations & interactions
│   └── contact.js      ← Form handler
└── assets/             ← Put your images here
```

---

## ✏️ Where to Edit

### Change Your Name/Brand
**Files**: All HTML files  
**Find**: `captaincto`  
**Replace with**: Your name

### Change Colors
**File**: `css/styles.css` (lines 8-25)  
**Variables to modify**:
```css
--warm-lantern: #ffb347;    /* Your warm accent */
--cool-neon: #00d9ff;        /* Your cool accent */
```

### Update Projects
**File**: `index.html` (Featured Projects section)  
**File**: `projects.html` (Detailed project pages)  
**What to change**:
- Project titles
- Descriptions
- Tech stacks
- Links

### Update Skills
**File**: `skills.html`  
**What to change**:
- Skill names
- Proficiency percentages (0-100)
- Categories

### Update Contact Info
**File**: `contact.html`  
**What to change**:
- Email address
- Social media links
- Availability status

---

## 🎨 Visual Customization

### Change Fonts
**File**: All HTML files (`<head>` section)  
**Current fonts**:
- Playfair Display (display)
- Noto Serif JP (body)
- Inter (UI)

Replace the Google Fonts link and update CSS variables in `styles.css`.

### Adjust Animation Speed
**File**: `css/styles.css` (line 64)  
```css
animation: skyTransition 120s ease-in-out infinite;
/* Change 120s to speed up/slow down day/night cycle */
```

### Modify Skyline
**File**: All HTML files (SVG section)  
Each building:
```html
<rect x="50" y="350" width="120" height="250" 
      class="building" data-speed="0.3"/>
```
- Adjust x, y for position
- Change width, height for size
- Modify data-speed for parallax effect

---

## 📱 Testing Checklist

Before deploying:

- [ ] Test homepage loads correctly
- [ ] Test all 5 pages load
- [ ] Test navigation works
- [ ] Test on mobile device (or use browser dev tools)
- [ ] Check animations are smooth
- [ ] Verify all your content is updated
- [ ] Test contact form (even if it's demo)
- [ ] Confirm no broken links

---

## 🔧 Common Issues

### Animations laggy on mobile?
**Fix**: In `js/main.js` line 185, reduce particle count:
```javascript
this.particleCount = 10; // was 20
```

### Contact form not working?
**Note**: The form is a demo. To make it work:
1. Use Formspree (easiest)
2. Use EmailJS
3. Build your own backend

See README.md for integration details.

### Sky animation not showing?
**Check**: Browser compatibility. Works in all modern browsers.

---

## 💡 Pro Tips

1. **Content First**: Add your real content before heavy customization
2. **Test Often**: Check changes in browser after each edit
3. **Use Version Control**: Initialize a git repo to track changes
4. **Compress Images**: Use TinyPNG or similar before adding images
5. **Mobile First**: Always check mobile view

---

## 📚 Next Steps

1. **Immediate**: Replace placeholder content with your own
2. **Soon**: Add your project screenshots to `/assets`
3. **Later**: Customize colors and animations to match your brand
4. **Advanced**: Add a blog section, integrate analytics

---

## 🎯 Customization Priority

**Must Do** (Before deployment):
1. ✅ Replace all "captaincto" references
2. ✅ Update bio/about text
3. ✅ Add your real projects
4. ✅ Update contact information

**Should Do**:
1. ✅ Customize color scheme
2. ✅ Add project images
3. ✅ Connect contact form backend
4. ✅ Add favicon

**Nice to Have**:
1. ✅ Custom fonts
2. ✅ Modify skyline buildings
3. ✅ Add more sections
4. ✅ Integrate analytics

---

## 🆘 Need Help?

1. Read the code comments (they're detailed!)
2. Check README.md for comprehensive guide
3. Use browser dev tools (F12) to debug
4. Search MDN Web Docs for HTML/CSS/JS help

---

## 🎉 You're Ready!

Open `index.html` and start making it yours. This is your foundation—build something amazing on it!

**Remember**: The best portfolio is one that truly represents you. Don't be afraid to experiment and make it uniquely yours.

Good luck! 🏮✨
