# Zameer Portfolio - Setup Guide

## 📁 Required Files in `assets/` Folder

Place the following files inside the `assets/` directory:

| File Name | Purpose | Format |
|---|---|---|
| `Profile.jpg` | Your profile/avatar photo (circular crop applied via CSS) | `.jpg` or `.png` |
| `logo.png` | Your personal logo (displayed in header if added) | `.png` (transparent bg recommended) |
| `Zameer Haider.pdf` | Your downloadable resume/CV | `.pdf` |
| `1.jpg` | AI Graphics portfolio image #1 | `.jpg` or `.png` |
| `2.jpg` | AI Graphics portfolio image #2 | `.jpg` or `.png` |
| `3.jpg` | AI Graphics portfolio image #3 | `.jpg` or `.png` |
| `4.jpg` | AI Graphics portfolio image #4 | `.jpg` or `.png` |
| `5.jpg` | AI Graphics portfolio image #5 | `.jpg` or `.png` |
| `6.jpg` | AI Graphics portfolio image #6 | `.jpg` or `.png` |
| `7.jpg` | AI Graphics portfolio image #7 | `.jpg` or `.png` |
| `8.jpg` | AI Graphics portfolio image #8 | `.jpg` or `.png` |
| `9.jpg` | AI Graphics portfolio image #9 | `.jpg` or `.png` |

> **Tip:** You can add more gallery images by duplicating gallery card HTML in `ai-graphics.html` and naming files `10.jpg`, `11.jpg`, etc.

---

## 📂 Project Structure

```
Zameer Portfolio/
├── index.html            ← Main landing page (all sections)
├── ai-graphics.html      ← AI-powered graphic design gallery
├── tools.html            ← Dedicated tools & tech stack page
├── README.md             ← This file
├── css/
│   └── style.css         ← Full design system & styles
├── js/
│   └── main.js           ← Interactions, animations, hamburger menu
└── assets/
    ├── Profile.jpg       ← Your profile photo
    ├── logo.png          ← Your logo
    ├── Zameer Haider.pdf ← Your downloadable resume
    ├── 1.jpg             ← Gallery image 1
    ├── 2.jpg             ← Gallery image 2
    └── ...               ← More gallery images
```

---

## 🚀 How to Run Locally

1. Open terminal in the project folder
2. Run: `python -m http.server 8080`
3. Open browser: `http://localhost:8080`

Or simply double-click `index.html` to open directly.

---

## 🌐 Deploying to GitHub Pages

1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at: `https://yourusername.github.io/repo-name/`

---

## ✏️ How to Customize

### Change profile photo
Replace `assets/Profile.jpg` with your photo (keep the same filename).

### Change logo
Replace `assets/logo.png` with your logo.

### Change resume
Replace `assets/Zameer Haider.pdf` with your updated CV.

### Add more gallery images
1. Add images to `assets/` folder (e.g., `10.jpg`)
2. Open `ai-graphics.html`
3. Copy a `<div class="gallery-card">` block and update the `src` and `alt`

### Change contact info
Edit the footer section in `index.html` - phone, email, and location are in the `footer-contact` list.

---

## 🎨 Design System: Toybox-Pro + Prism-Soft 3D

- **Layout**: Clean, spacious, mature typography
- **Interactive Elements**: Cute, 3D, multi-colored with high-gloss finishes
- **Colors**: Coral, Amber, Mint, Sky, Lavender, Pink
- **Fonts**: Outfit (headings) + Inter (body) via Google Fonts
- **Mobile**: 2–3 column card grids, hamburger navigation
