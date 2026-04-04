# 🚀 Getting Started Guide
**Step 1 of 7** // Setting up your local environment

This guide will help you set up your portfolio for local development and prepare it for customization.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: For cloning the repository.
- **Code Editor**: We recommend [Visual Studio Code](https://code.visualstudio.com/).
- **Web Server**: Any static file server will work. 

> [!TIP]
> This portfolio is built with pure HTML, CSS, and JS, meaning it **does not require a build step**. You can edit and refresh instantly!

---

## 1. Clone the Repository

Clone the project to your local machine and navigate into the directory:

```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio
```

## 2. Local Development

Because the site uses `fetch()` to load page partials, you **must use an HTTP server** (the `file://` protocol will not work due to CORS restrictions).

### Option 1: Using `npx` (Node.js)
If you have Node.js installed, run:
```bash
npx serve .
```

### Option 2: VS Code Live Server
1. Install the **"Live Server"** extension.
2. Right-click `index.html` and select **"Open with Live Server"**.

Once the server is running, visit `http://localhost:3000` (or the port specified) to see your portfolio!

---

## 3. Initial Configuration

Before making detailed changes, verify that you can edit the global configuration:

1. Open **`config/portfolio.config.js`** (Frontend) and **`config/theme.config.js`** (Visuals).
2. Locate the `meta` object in `portfolio.config.js`.
3. Update a field (like your `name`) and refresh your browser.

> [!IMPORTANT]
> If your changes don't appear immediately, try a **Hard Refresh** (Ctrl + F5) to clear the browser's script cache.

---

## 🔗 Sequential Navigation

← **Previous:** [README](../README.md) | **Next:** [Deployment Guide](DEPLOYMENT.md) →
