# captaincto Portfolio

Live at [thecaptaincto.github.io/portfolio](https://thecaptaincto.github.io/portfolio)

Personal portfolio for captaincto — UI/UX designer and developer based in Montréal. Built solo, no framework, no build tools.

## Stack

- HTML, CSS, Vanilla JavaScript
- Single shared stylesheet (`css/styles.css`) and script (`js/main.js`)
- No dependencies, no bundler

## Pages

- `index.html` — hero, featured work, about snapshot, philosophy
- `about.html` — background, story, how I work, skills
- `projects.html` — full project list (Touch Grass, Flux, CTO Blogductions)
- `contact.html` — email, GitHub, LinkedIn

## Run Locally

Open `index.html` directly in a browser, or serve it:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

Already configured on GitHub Pages from the `main` branch root.

To push updates:

```bash
git add <files>
git commit -m "your message"
git push origin main
```

GitHub Pages deploys automatically. Allow 1–3 minutes and hard refresh (`Ctrl+F5`) if the site doesn't update.
