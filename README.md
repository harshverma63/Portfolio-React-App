# 🚀 React Portfolio Website

A modern, responsive, and animated personal portfolio website built using **React 19 + Vite**. This project showcases projects, skills, and contact functionality with a clean UI and smooth interactions.

---

## 📌 Features

- ⚡ Built with **React 19** and **Vite**
- 🎨 Clean and modern UI design
- 📱 Fully responsive across all devices
- 🧭 Smooth navigation with interactive sections
- ✨ Custom cursor & particle background effects
- 📬 Contact form integration using EmailJS
- 🎯 Optimized performance and fast load times

---

## 🛠️ Tech Stack

- **Frontend:** React 19, JSX, CSS
- **Build Tool:** Vite
- **Icons:** Lucide React, React Icons
- **Email Service:** EmailJS
- **Linting:** ESLint

---

## 📂 Project Structure
PortfolioApp/
│── src/
│ ├── assets/ # Images & icons
│ ├── Comps/
│ │ ├── components/ # UI Components
│ │ │ ├── Navbar.jsx
│ │ │ ├── Hero.jsx
│ │ │ ├── Sections.jsx
│ │ │ ├── Contact.jsx
│ │ │ ├── Cursor.jsx
│ │ │ ├── ParticleBackground.jsx
│ │ ├── styles.css
│ │ ├── main.jsx
│ │ ├── PortfolioApp.jsx
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│── index.html
│── package.json
│── vite.config.js


---

## ⚙️ Installation & Setup
1. Clone the repository:
```bash
git clone <your-repo-url>
cd PortfolioApp

2. Install dependencies:
npm install
or (if using bun)
bun install

3. Start development server:
npm run dev

4. Build for production:
npm run build

5. Preview production build:
npm run preview

📧 Contact Form Setup (EmailJS)
Create an account at EmailJS
Create a service and email template
Replace credentials inside the Contact component:
emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  formData,
  "YOUR_PUBLIC_KEY"
);

🎯 Customization
Update content inside components:
Hero.jsx → Intro section
Sections.jsx → Projects & experience
Contact.jsx → Contact details
Replace images in /assets
Modify styles in CSS files

🚀 Deployment
You can deploy this project on:
Netlify
Vercel
GitHub Pages

Example (Netlify):
Drag & drop dist folder after build

🧹 Scripts
npm run dev      # Start development
npm run build    # Build project
npm run preview  # Preview build
npm run lint     # Run ESLint

📄 License
This project is open-source and free to use.

👨‍💻 Author
Harsh Verma

⭐ Show Your Support:
If you like this project, give it a ⭐ on GitHub!