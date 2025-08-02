# 🎨 Theme Switcher

A beautiful and responsive theme switching application built with React, TypeScript, and Tailwind CSS. Seamlessly toggle between different themes with smooth animations and modern UI components.

## ✨ Features

- 🌓 **Dynamic Theme Switching** - Toggle between light, dark, and custom themes
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎯 **Type Safe** - Full TypeScript support for robust development
- 🎨 **Modern UI** - Radix UI components with Tailwind CSS styling
- 📱 **Responsive Design** - Works perfectly on all device sizes
- 🚀 **Smooth Animations** - Enhanced with CSS animations
- 🔧 **Developer Friendly** - ESLint configuration and hot reload

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4.x, CSS Animations
- **UI Components**: Radix UI (Select, Slot)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Linting**: ESLint with React plugins

## 🚀 Quick Start

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd theme-switcher
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application in action!

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Build the application for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint to check code quality |

## 🏗️ Project Structure

```
theme-switcher/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── styles/        # Global styles and theme configs
├── public/            # Static assets
├── package.json       # Project dependencies and scripts
└── README.md         # Project documentation
```

## 🎨 Theme Configuration

The application supports multiple themes out of the box:

- **Light Theme** - Clean and minimal design
- **Dark Theme** - Easy on the eyes for low-light environments
- **Custom Themes** - Easily extendable theme system

### Adding New Themes

1. Define your theme colors in the Tailwind configuration
2. Create theme variants using class-variance-authority
3. Add the theme option to your theme switcher component
 you would like to change.


### Live Link
 https://theme-switcher-orcin.vercel.app/

1. Fork the project

https://github.com/chaitanyavarshney/theme-switcher
