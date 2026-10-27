# Sidharth Gopakumar — Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript, with no build step.

## Run it locally

Double-click `index.html`, or for the most accurate result serve the folder:

```
cd PORTFOLIO
python -m http.server 8000
```

Then open http://localhost:8000

## Put it online (Netlify, like the museum site)

1. Go to https://app.netlify.com/drop
2. Drag this whole `PORTFOLIO` folder onto the page.
3. Netlify gives you a live link. Rename it under Site settings → Change site name.

## Folder layout

```
index.html            page content and structure
css/style.css         all styling
js/main.js            animations and interactions
js/vendor/            libraries, stored locally so the site works on any network
  three.min.js        3D network (Three.js r128)
  gsap.min.js         animation engine (GSAP 3.12.5)
  ScrollTrigger.min.js scroll-driven animation (GSAP plugin)
  lenis.min.js        smooth scrolling (Lenis 1.1.13)
assets/
  sidharth.jpg        profile photo
  favicon.svg         browser tab icon
```

## Editing common things

- **Projects:** in `index.html`, search for `<article class="proj"`. Each card is one project.
- **Terminal commands:** in `js/main.js`, search for `const COMMANDS`.
- **OSI layer skills:** in `js/main.js`, search for `const L = {`. Prefix a skill with `~` to show it as "learning".
- **Contact details:** in `index.html`, search for `id="contact"`.
- **Colours:** at the top of `css/style.css`, the `--aqua` and `--yellow` variables.

## Compatibility

Tested at phone (320 and 390 px), landscape phone, tablet, iPad landscape, laptop and 1080p desktop sizes.

- Hover effects (tilt, magnetic buttons, retro cursor) switch off on touch screens. Tap alternatives are built in.
- Respects the "reduce motion" accessibility setting.
- If WebGL is unavailable, the 3D network is skipped and the rest of the page still works.
- Fonts load from Google Fonts. Without internet they fall back to system fonts.
