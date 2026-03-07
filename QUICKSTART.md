# QUICKSTART

Use this if you want to edit and publish fast.

## 1) Open the site
- Open `index.html` directly, or
- Serve locally:
```powershell
cd C:\Users\spike\cto-portfolio
python -m http.server 8080
```
Open `http://localhost:8080`.

## 2) Replace templates first
Search for `Template:` and update:
- `index.html`
- `projects.html`
- `contact.html`

Priority edits:
- Resume link
- Project demo/GitHub links
- Project outcome bullets (`Problem solved`, `Result`)
- Contact and social URLs

## 3) Update branding/details
- Name/logo text in nav/footer
- Meta descriptions in each HTML `<head>`
- Optional colors in `css/styles.css` (`:root` variables)

## 4) Sanity check before push
- Test all nav links
- Test mobile menu
- Test desktop + mobile widths
- Verify no `href="#"` remains unless intentional

## 5) Commit and push
If repo is already initialized:
```powershell
cd C:\Users\spike\cto-portfolio
git add .
git commit -m "Update portfolio content and visuals"
git push origin main
```

If this folder is not a git repo yet:
```powershell
cd C:\Users\spike\cto-portfolio
git init
git branch -M main
git remote add origin https://github.com/thecaptaincto/portfolio.git
git add .
git commit -m "Initial portfolio publish"
git push -u origin main
```

## 6) GitHub Pages publish
- GitHub -> Repo -> `Settings -> Pages`
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

## Quick Troubleshooting
- Wrong repo updated:
```powershell
git remote -v
git remote set-url origin https://github.com/thecaptaincto/portfolio.git
```
- Site not refreshing: wait 1-3 minutes and hard refresh (`Ctrl+F5`).
- Broken styles/scripts: ensure `css/styles.css` and `js/main.js` paths are unchanged.
