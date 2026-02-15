# 🏮 Lantern City Portfolio

**A cinematic East Asian night-themed portfolio website**  
*Heritage × Future • Tradition × Innovation*

---

## 🎨 Overview

This is a fully responsive, multi-page personal portfolio website featuring:

- **Immersive Visual Experience**: Animated sky transitions (day/night cycle), parallax skyline, floating lanterns
- **East Asian Night Aesthetic**: Warm lantern glow meets cool neon skyline
- **Zero Dependencies**: Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- **Production-Ready**: Clean, well-commented, modular code
- **Fully Responsive**: Beautiful on all devices from mobile to 4K displays

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Homepage (flagship immersive experience)
├── about.html              # About page with detailed bio
├── projects.html           # Project showcase
├── skills.html             # Skills & capabilities
├── contact.html            # Contact form
├── README.md               # Instruction manual/landing page
├── css/
│   ├── styles.css          # Main styles (sky, skyline, components)
│   └── pages.css           # Inner page styles
├── js/
│   ├── main.js             # Core functionality & animations
│   └── contact.js          # Contact form handler
└── assets/                 # (Empty - ready for your images/icons)
```

---

## 🚀 Quick Start

### 1. **Download & Extract**
Extract the portfolio folder to your desired location.

### 2. **Open in Browser**
Simply open `index.html` in any modern web browser.

### 3. **Start Customizing**
Follow the customization guide below to make it your own!

---

## ✨ Features

### Visual Layers
- **Sky Layer**: Animated gradient simulating day/night cycle (120s loop)
- **Skyline Layer**: SVG building silhouettes with neon edge glow and window lights
- **Foreground Layer**: Floating lanterns with subtle glow/flicker animation
- **Particle System**: Drifting light particles for atmospheric depth

### Animations & Interactions
- Scroll-triggered section reveals
- Parallax scrolling on skyline buildings
- Smooth fade/slide transitions
- Lantern float & flicker effects
- Skyline window light animations
- Scroll progress indicator
- Hover glow interactions
- Mobile-optimized touch interactions

### Pages Included
1. **Homepage** - Hero section, about snapshot, featured projects, skills preview, philosophy, contact teaser
2. **About** - Full biography, quick facts sidebar, values, interests
3. **Projects** - 5 detailed project showcases with tech stacks
4. **Skills** - Comprehensive skill cards with proficiency levels
5. **Contact** - Contact form with validation, social links, availability status

---

## 🎯 Customization Guide

### Personal Information

#### 1. **Update Your Name & Brand**
**File**: All HTML files  
**What to change**:
```html
<!-- Find and replace "captaincto" with your name/brand -->
<h1 class="hero-title">
    <span class="title-line">YOUR</span>
    <span class="title-line">NAME</span>
</h1>

<!-- Update tagline -->
<p class="hero-tagline">Your personal tagline here</p>

<!-- Footer -->
<p class="footer-text">Your Productions</p>
```

#### 2. **Update About Section**
**File**: `index.html` (lines ~115-135) and `about.html`  
**What to change**:
- Replace the biography text with your own story
- Update age, experience level, and background
- Modify interests, values, and learning goals

#### 3. **Update Projects**
**File**: `index.html` (lines ~160-260) and `projects.html`  
**What to change**:
```html
<!-- For each project card: -->
<article class="project-card">
    <div class="project-number">01</div>
    <h3 class="project-title">YOUR PROJECT NAME</h3>
    <p class="project-description">
        Your project description here
    </p>
    <div class="project-tech">
        <span class="tech-tag">Your</span>
        <span class="tech-tag">Tech</span>
        <span class="tech-tag">Stack</span>
    </div>
    <a href="#your-project" class="project-link">View Project →</a>
</article>
```

#### 4. **Update Skills**
**File**: `index.html` (lines ~280-350) and `skills.html`  
**What to change**:
- Update skill names and proficiency percentages
- Modify `data-skill` attribute (0-100)
- Add/remove skill categories as needed

#### 5. **Update Contact Info**
**File**: `contact.html`  
**What to change**:
```html
<!-- Update all contact methods -->
<div class="contact-method">
    <div class="method-icon">✉️</div>
    <div class="method-content">
        <h3 class="method-title">Email</h3>
        <p class="method-detail">your@email.com</p>
    </div>
</div>
```

---

### Visual Customization

#### 1. **Color Scheme**
**File**: `css/styles.css` (lines 8-25)

```css
:root {
    /* Sky colors - modify for different day/night palette */
    --night-deep: #0f0f23;
    --night-purple: #1a1a3e;
    
    /* Theme colors - your brand colors */
    --warm-lantern: #ffb347;    /* Warm accent color */
    --cool-neon: #00d9ff;        /* Cool accent color */
    
    /* Text colors */
    --text-primary: #f5f5f5;
    --text-secondary: #d1d5db;
}
```

**Pro tip**: Use a color palette generator (like coolors.co) to create a cohesive scheme.

#### 2. **Typography**
**File**: `css/styles.css` (lines 27-30)

Current fonts:
- **Display**: Playfair Display (elegant serif)
- **Body**: Noto Serif JP (East Asian flavor)
- **UI**: Inter (clean sans-serif)

To change:
```css
:root {
    --font-display: 'Your Display Font', serif;
    --font-body: 'Your Body Font', serif;
    --font-ui: 'Your UI Font', sans-serif;
}
```

Don't forget to update the Google Fonts link in each HTML file's `<head>`.

#### 3. **Sky Animation Speed**
**File**: `css/styles.css` (line 64)

```css
.sky-layer {
    /* Change duration (default: 120s) */
    animation: skyTransition 120s ease-in-out infinite;
}
```

Faster = more dynamic, Slower = more subtle.

#### 4. **Skyline Buildings**
**File**: All HTML files - SVG section

To add/remove/modify buildings:
```html
<!-- Each building is defined like this: -->
<rect x="50" y="350" width="120" height="250" class="building" data-speed="0.3"/>
<!--   x = horizontal position
       y = vertical position
       width = building width
       height = building height
       data-speed = parallax speed (0.2-0.5) -->
```

Building classes:
- `.building` - Standard building
- `.building-tall` - Taller with purple glow
- `.building-tallest` - Tallest with golden glow

---

### Adding Your Own Content

#### Adding a New Project

1. **Homepage** (`index.html`):
```html
<!-- Add this in the projects grid section -->
<article class="project-card">
    <div class="project-number">06</div>
    <h3 class="project-title">New Project Name</h3>
    <p class="project-description">Description here</p>
    <div class="project-tech">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
    </div>
    <a href="projects.html#newproject" class="project-link">View Project →</a>
</article>
```

2. **Projects Page** (`projects.html`):
```html
<!-- Add a new section like this -->
<section class="project-detail section-reveal" id="newproject">
    <div class="container">
        <div class="project-header">
            <span class="project-tag">Category</span>
            <h2 class="project-detail-title">Project Name</h2>
            <p class="project-tagline">Tagline</p>
        </div>
        <!-- Add content blocks as needed -->
    </div>
</section>
```

#### Adding Images

1. Place images in `/assets` folder
2. Reference in HTML:
```html
<img src="assets/your-image.jpg" alt="Description">
```

For project screenshots, consider adding:
```html
<div class="project-image">
    <img src="assets/project-screenshot.jpg" alt="Project Name">
</div>
```

Then add CSS to `pages.css`:
```css
.project-image {
    margin: 40px 0;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 179, 71, 0.2);
}

.project-image img {
    width: 100%;
    height: auto;
    display: block;
}
```

---

## 🔧 Technical Details

### Browser Compatibility
- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers

### Performance Optimizations
- Throttled scroll events (50-200ms)
- CSS animations over JavaScript where possible
- Lazy loading implementation ready
- Reduced motion support for accessibility
- Mobile-specific optimizations

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels ready (add as needed)
- Keyboard navigation support
- Focus indicators
- Reduced motion media query support

---

## 📱 Responsive Breakpoints

```css
/* Desktop Large */
@media (min-width: 1200px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile Large */
@media (max-width: 768px) { }

/* Mobile Small */
@media (max-width: 480px) { }
```

---

## 🔌 Integrating Backend Services

### Contact Form Options

#### Option 1: Formspree
```javascript
// In js/contact.js, replace the fetch call with:
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
})
```

#### Option 2: EmailJS
```javascript
// Add EmailJS SDK in contact.html head:
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// In js/contact.js:
emailjs.send('service_id', 'template_id', formData)
    .then(response => { /* success */ })
```

#### Option 3: Your Own Backend
Set up a Node.js/Express backend and update the fetch endpoint in `js/contact.js`.

---

## 🚀 Deployment

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select main branch
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify
1. Drag and drop your portfolio folder to netlify.com
2. Get instant deployment
3. Configure custom domain (optional)

### Option 3: Vercel
1. Import from GitHub or upload directly
2. Deploy with zero configuration
3. Automatic HTTPS

---

## 📝 Customization Checklist

- [ ] Update name/brand throughout all pages
- [ ] Replace taglines and bio text
- [ ] Add your actual projects (3-5 minimum)
- [ ] Update skills and proficiency levels
- [ ] Add contact information
- [ ] Choose and apply your color scheme
- [ ] Add your images/screenshots
- [ ] Connect contact form to backend
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Add your favicon
- [ ] Configure SEO meta tags
- [ ] Deploy to hosting platform

---

## 🎓 Learning Resources

If you want to modify or extend this template:

- **HTML/CSS Basics**: MDN Web Docs (developer.mozilla.org)
- **JavaScript**: javascript.info
- **SVG**: css-tricks.com/lodge/svg
- **Animations**: web.dev/animations
- **Accessibility**: a11y-101.com

---

## 💡 Tips for Success

1. **Start Simple**: Get your content in first, customize visuals second
2. **Test Often**: Check your site on different devices and browsers
3. **Keep It Real**: Use genuine content about yourself, not placeholder text
4. **Optimize Images**: Compress images before adding them
5. **Version Control**: Use Git to track changes
6. **Get Feedback**: Show your portfolio to friends/colleagues

---

## 🐛 Troubleshooting

### Issue: Animations are laggy on mobile
**Solution**: Reduce particle count in `js/main.js` (line 185):
```javascript
this.particleCount = 10; // Reduced from 20
```

### Issue: Sky animation not working
**Solution**: Check browser support for CSS animations. Some older browsers may need vendor prefixes.

### Issue: Form not submitting
**Solution**: Check browser console for errors. Make sure you've integrated a backend service (see Integration section).

### Issue: Skyline not showing
**Solution**: SVG elements must be properly closed. Check for syntax errors in the SVG code.

---

## 📄 License

This template is provided as-is for personal and commercial use. Feel free to customize it to make it your own!

---

## 🙏 Credits

**Design Inspiration**: East Asian night aesthetics, lantern festivals, modern cityscapes  
**Fonts**: Google Fonts (Playfair Display, Noto Serif JP, Inter)  
**Built By**: Created with care and attention to detail

---

## 📞 Need Help?

If you get stuck, remember:
1. Check the code comments - they're detailed
2. Search MDN Web Docs for HTML/CSS/JS questions
3. Test in browser dev tools (F12)
4. Start with small changes and test frequently

---

**Good luck with your portfolio! Make it uniquely yours.** 🏮✨
