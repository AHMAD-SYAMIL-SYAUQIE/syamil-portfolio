<div align="center">
  
# 🚀 Portfolio Website

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, responsive personal portfolio website built with React and Vite**

</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, futuristic design with smooth animations
- 🌙 **Dark Theme** - Eye-friendly dark mode with gradient accents
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📧 **Contact Form** - Integrated with EmailJS for direct messaging
- ✨ **Particle Effects** - Beautiful WebGL particle background
- 🔄 **Smooth Scrolling** - Enhanced UX with Lenis smooth scroll
- 🛡️ **Spam Protection** - Rate limiting and profanity filter on contact form

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, JSX, CSS3 |
| **Build Tool** | Vite (Rolldown) |
| **Animations** | Framer Motion, CSS Animations |
| **3D/WebGL** | OGL |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React |
| **Email Service** | EmailJS |
| **Notifications** | SweetAlert2 |
| **Document Generation** | docx, file-saver |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── certificates/      # Certificate images
├── src/
│   ├── component/         # Reusable UI components
│   ├── Components/        # Feature components
│   │   ├── About/         # Profile, Skills, Certificates
│   │   ├── Contact/       # ContactForm, SocialLinks
│   │   ├── Home/          # Hero, Features, SystemStatus
│   │   ├── Layout/        # Navbar, IntroScreen
│   │   └── Projects/      # ProjectCard
│   ├── hooks/             # Custom React hooks
│   ├── Pages/             # Page components
│   ├── Styles/            # Global styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure EmailJS** (optional)
   
   Update the EmailJS configuration in `src/Components/Contact/ContactForm.jsx`:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY')
   
   await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     templateParams
   )
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

---

## 🌐 Deployment

This project is optimized for deployment on platforms like **Vercel**, **Netlify**, or **GitHub Pages**:

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy! 🚀

### Manual Deployment

```bash
npm run build
# Upload the contents of the 'dist' folder to your hosting provider
```

---

## 🔧 Customization

### Updating Content

- **Personal Info**: Edit `src/Components/Home/HeroSection.jsx` and `src/Components/About/ProfileSection.jsx`
- **Skills**: Modify `src/Components/About/Skills.jsx`
- **Projects**: Update `src/Pages/ProjectsPage.jsx`
- **Social Links**: Edit `src/Components/Contact/SocialLinks.jsx`

### Styling

- **Global Styles**: `src/Styles/App.css`
- **Component Styles**: Each component has its own `.css` file

---

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🤝 Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AHMAD-SYAMIL-SYAUQIE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmad-syamil-syauqie-/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/frezuarrr/)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you like this project, please give it a star!**

Made with ❤️ using React & Vite

</div>