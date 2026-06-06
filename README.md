# FORMWORKS — Website

Static portfolio site for FORMWORKS (Architecture · Interiors · Planning), Coimbatore & Bangalore.

Pure HTML/CSS/JS — no build step, no dependencies. Just static files.

```
index.html            # the whole site (single page)
assets/css/style.css  # styles
assets/js/main.js      # nav, project gallery/lightbox, scroll reveal
assets/img/            # web-optimized photos + logo
```

Content and images were extracted from `FORMWORKS - Portfolio.pdf` via `extract_portfolio.ipynb`
(that notebook + `assets_raw/` are dev-only and excluded from the published site via `.gitignore`).

## Preview locally
```
python -m http.server 8000
# then open http://127.0.0.1:8000
```

## Deploy (GitHub Pages — free)
1. Create a GitHub repo and push the contents of this `Website/` folder to it.
2. Repo → Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / root.
3. Live at `https://<username>.github.io/<repo>/` within a minute.
4. (Optional) Add custom domain `formworks.com` under Settings → Pages → Custom domain;
   GitHub provisions free HTTPS automatically.

## Updating content
- Edit project text in `assets/js/main.js` (the `PROJECTS` array).
- To swap/add photos, drop web-sized JPGs into `assets/img/` named `<slug>-NN.jpg`
  and bump the `photos` count for that project.
