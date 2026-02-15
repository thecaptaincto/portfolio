# Lantern City Portfolio - Fixed Version

A beautiful, fully-functional portfolio website with a night theme, animated lanterns, and stunning gradients.

## ✨ What's Fixed

- ✅ **Removed time-of-day transitions** - Now uses a consistent dark night theme with subtle gradient variations
- ✅ **Improved lantern animations** - More realistic with glowing effects and smooth floating
- ✅ **Added flowing particles** - Subtle background animation that doesn't distract
- ✅ **Fixed all pages** - About, Skills, and Contact pages now display properly
- ✅ **Fixed "captaincto" title** - Now displays on one line as requested
- ✅ **Fixed navigation** - Always visible when scrolling, no disappearing
- ✅ **Better gradients** - Night sky uses smooth gradient transitions
- ✅ **Improved readability** - Text colors optimized for the dark theme
- ✅ **Maintained fonts** - Kept the beautiful Playfair Display and Noto Serif JP fonts

## 🚀 Quick Start

1. Extract the ZIP file
2. Open `index.html` in your browser
3. That's it! No build process needed.

## 📁 File Structure

```
cto-portfolio-fixed/
├── index.html          # Home page
├── about.html          # About page
├── projects.html       # Projects page
├── skills.html         # Skills page
├── contact.html        # Contact page
├── css/
│   └── styles.css      # All styles in one file
├── js/
│   └── main.js         # All JavaScript in one file
└── README.md           # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --night-deep: #0a0a1e;
    --warm-lantern: #ffb347;
    --cool-neon: #00d9ff;
    /* etc. */
}
```

### Updating Content

All content is directly in the HTML files. Just open them in a text editor and modify:

- **Personal info**: Edit the text in each section
- **Projects**: Update the `.project-card` sections
- **Skills**: Modify the `data-skill` percentages
- **Contact**: Update email and social links

### Adding Images

While this version uses SVG graphics and gradients, you can add images:

1. Create an `assets/images/` folder
2. Add your images
3. Reference them in HTML: `<img src="assets/images/your-image.jpg">`

## 🌟 Features

- **Responsive Design** - Works on all devices
- **Smooth Animations** - Lanterns, particles, parallax scrolling
- **Night Theme** - Beautiful dark color scheme with gradients
- **Always-visible Navigation** - Sticky nav that stays at the top
- **Animated Skill Bars** - Reveal on scroll
- **Window Lights** - Animated building windows in the skyline
- **Particle System** - Floating particles in the background
- **Cursor Glow Effect** - Subtle glow follows your cursor (desktop only)

## 📱 Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 💡 Tips

- The lanterns are animated with CSS - no JavaScript needed for basic floating
- Particles are dynamically generated on page load
- All animations respect `prefers-reduced-motion` for accessibility
- The navigation adapts to mobile with a hamburger menu

## 🔧 Troubleshooting

**Navigation disappears when scrolling:**
- This should be fixed! Nav has `position: fixed` and `z-index: 1000`

**Pages look blank:**
- Check that all files are in the correct folders
- Make sure `styles.css` and `main.js` paths are correct

**Fonts not loading:**
- You need an internet connection for Google Fonts
- Or download fonts locally and update the CSS

## 📝 License

Feel free to use this template for your own portfolio! Modify it however you like.

---

**Built with care under the lantern light 🏮**

© 2024 captaincto
