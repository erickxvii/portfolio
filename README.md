# Erick Perez — Portfolio

A fast, animated personal website built with React + Vite. Includes a glitchy hero, hyperspeed background, project cards (Cloudflare AI Security Agent, Safe Route Recommender — *in the works*), and an EmailJS-powered contact form.

Live: https://erickxvii.com/
---

## ✨ Features

- **Animated UI** with Framer Motion
- **Hyperspeed background** canvas effect
- **Code snippet panel** (react-syntax-highlighter)
- **Projects section**
  - Cloudflare AI Security Agent (edge log ingestion + anomaly hints)
  - Safe Route Recommender (*In the Works*) — ML route risk scoring
- **Contact form** (EmailJS browser SDK)
- **Social links** (GitHub / LinkedIn / X) with hover styling
- **Dark mode-first** styling

---

## 🧱 Tech Stack

- **React 18 + Vite**
- **Framer Motion**
- **EmailJS (browser SDK)**
- **React Syntax Highlighter**
- **Font Awesome (CDN)**
- Tailwind or custom CSS (depending on your setup)

> Icons: Using Font Awesome classes (loaded via `<link>` in `index.html`).

---

## 🗂 Project Structure (key files)
src/
App.jsx
components/
Navbar.jsx
Hero.jsx
Projects.jsx
Contact.jsx
HyperspeedBackground.jsx
styles/
(App.css / index.css / globals.css)
index.html


🛠 Local Development
# install deps
npm install

# run dev server
npm run dev

# build for production
npm run build

# preview build locally
npm run preview
