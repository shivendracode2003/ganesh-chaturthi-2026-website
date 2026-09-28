# Ganesh Chaturthi 2026 website

Static site. No install or build step needed.

## Run
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Structure
- `index.html`: page content
- `css/style.css`: design (colours are the variables at the top)
- `js/main.js`: countdown, image viewer, wishes box
- `images/`: the five Ganpati photos

## Edit
- Aarti timings: the `#aarti` section in index.html
- Captions: the `.card` blocks in index.html
- Countdown target: the date string in js/main.js
- Wishes are saved only in the visitor's own browser.

## Publish free
Push this folder to a GitHub repository, then open **Settings → Pages** and set
the build and deployment source to **GitHub Actions**. The included workflow
deploys the site automatically whenever you push to `main`, or when you run it
manually from the repository's **Actions** tab.

If your default branch is not named `main`, update the branch in
`.github/workflows/deploy.yml` before pushing. GitHub Pages will show the
published site URL under **Settings → Pages** after the first successful run.
