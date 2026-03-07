# captaincto Portfolio

Modern static portfolio with a futuristic blue night theme, smooth animations, and strong readability across desktop and mobile.

## Stack
- HTML (5 pages)
- CSS (single shared stylesheet)
- Vanilla JavaScript (single shared script)
- No build tools, no framework, no dependencies

## Pages
- `index.html` - home, featured work, quick proof, now section
- `about.html` - background and values
- `projects.html` - project list with outcome templates
- `skills.html` - skills and approach
- `contact.html` - contact channels and social links

## Project Structure
```text
cto-portfolio/
|-- index.html
|-- about.html
|-- projects.html
|-- skills.html
|-- contact.html
|-- css/
|   `-- styles.css
|-- js/
|   `-- main.js
|-- assets/
|-- README.md
`-- QUICKSTART.md
```

## Key Features
- Futuristic night city visual system (blue gradients, skyline, neon glow)
- Layered particles with subtle animation
- Sticky navigation with mobile menu improvements
- Scroll progress indicator
- Section reveal and skill bar animations
- Accessibility improvements:
  - `Skip to main content`
  - `aria-current` in nav
  - focus-visible states
  - reduced-motion support

## Customize
### 1) Content
Edit text directly in HTML files. Template placeholders are labeled with `Template:`.

### 2) Colors
Edit theme variables at the top of `css/styles.css`:
- `--night-deep`
- `--warm-lantern`
- `--warm-gold`
- `--cool-neon`
- `--cool-purple`

### 3) Links
Replace placeholder links in:
- `projects.html` (`href="#"` and `.template-link`)
- `index.html` (resume link in quick proof section)
- `contact.html` (social/contact profiles)

### 4) Skill bars
Update `data-skill` values (0-100) in `index.html` and `skills.html`.

## Run Locally
Open `index.html` in your browser.

Optional (recommended), run a local static server:
```powershell
cd C:\Users\spike\cto-portfolio
python -m http.server 8080
```
Then open `http://localhost:8080`.

## Deploy (GitHub Pages)
1. Push this folder to the correct repo (for example: `thecaptaincto/portfolio`).
2. In GitHub: `Settings -> Pages`.
3. Set source to `Deploy from a branch`.
4. Select `main` branch and `/ (root)` folder.
5. Save and wait for deployment.

## Notes
- If your site does not update, verify remote URL with:
```powershell
git remote -v
```
- If needed, fix it:
```powershell
git remote set-url origin https://github.com/thecaptaincto/portfolio.git
```

## License
Personal portfolio template. Reuse and modify freely.
