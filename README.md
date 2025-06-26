# 🎓 GradShowcase

GradShowcase is a sleek, responsive web application for showcasing graduates and their portfolios. Built with modern tooling like Vite, Tailwind CSS, and TypeScript, this app helps connect job-ready talent with employers through a clean and intuitive interface.  
🚀 **[Check it out live!](https://grad-showcase.vercel.app/)**

## ✨ Features

- 🧑‍🎓 Showcase student profiles with images and information  
- 🏢 Employer profiles and views  
- 🔍 Search and filter capabilities for easy browsing  
- ⚡ Fast performance via Vite and deployment on Vercel  
- 📱 Fully responsive design for mobile and desktop  
- 🎨 Clean, accessible, and user-friendly UI  

## 🖼️ Preview

![screenshot](./public/images/showcaseHero.jpg)

## 🚀 Tech Stack

- **Frontend Framework:** [Vite](https://vitejs.dev/)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Package Management:** npm  
- **Deployment:** Vercel  
- **Configuration:** PostCSS, ESLint, TypeScript configs  

## 📦 Installation & Development

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/GradShowcase.git
cd GradShowcase
```

2. **Install dependencies**  
```bash
npm install
```

3. **Run the development server**  
```bash
npm run dev
```

4. **Build for production**  
```bash
npm run build
```

5. **Preview the production build**  
```bash
npm run preview
```

## 📁 Project Structure

```
GradShowcase/
├── index.html                  # Root HTML file
├── package.json                # Project metadata and dependencies
├── postcss.config.js           # Tailwind + PostCSS setup
├── tailwind.config.js          # Custom Tailwind theme
├── tsconfig.json               # TypeScript configuration
├── vite.config.js              # Vite build config
├── /public                     # Static assets (images, etc.)
│   └── /images                 # Graduate and employer images
├── /src                        # Main source folder
│   ├── /components             # Reusable UI components
│   ├── /pages                  # Page-level views
│   ├── /data                   # Static or fetched data files
│   ├── /hooks                  # Custom React hooks
│   ├── /styles                 # Global styles (if any)
│   └── main.tsx                # Entry point for the app
```

## 🌐 Deployment

This project includes a `vercel.json` file for easy deployment with [Vercel](https://vercel.com). You can deploy by running:

```bash
vercel deploy
```

Or connect your GitHub repo to Vercel and push to trigger deployments automatically.

## 🧠 Usage Tips

- Tailwind utility classes are used throughout — adjust via `tailwind.config.js`  
- For dynamic content, consider integrating Firebase or another headless CMS  
- Update image assets inside `/public/images`  

## ✅ TODOs / Improvements

- [ ] N/A

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

1. Fork the repo  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to the branch (`git push origin feature/your-feature`)  
5. Open a pull request  

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Made with 💻 by Justin, Chi, Sarah
