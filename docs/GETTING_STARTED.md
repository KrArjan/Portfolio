# Getting Started Guide

This guide will help you set up your portfolio for local development and prepare it for customization.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: For cloning the repository.
- **Code Editor**: We recommend [Visual Studio Code](https://code.visualstudio.com/).
- **Web Server**: Any static file server will work. Examples include:
  - `npx serve` (requires Node.js)
  - Python's `http.server`
  - VS Code's "Live Server" extension

---

## 1. Clone the Repository

Clone the project to your local machine and navigate into the directory:

```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio
```

## 2. Local Development

This portfolio is built with pure HTML, CSS, and JS, meaning it **does not require a build step**. However, because it uses `fetch()` to load page partials, you **must use an HTTP server** (the `file://` protocol will not work).

### Option 1: Using `npx` (Node.js)
If you have Node.js installed, run:
```bash
npx serve .
```

### Option 2: Using Python
If you have Python installed, run:
```bash
python3 -m http.server 3000
```

### Option 3: VS Code Live Server
1. Install the "Live Server" extension.
2. Right-click `index.html` and select **"Open with Live Server"**.

Once the server is running, visit `http://localhost:3000` (or the port specified) to see your portfolio!

---

## 3. Initial Configuration

Before making detailed changes, verify that you can edit the global configuration:

1. Open `config/portfolio.config.js`.
2. Locate the `meta` object.
3. Change the `name` field to your own name.
4. Refresh your browser to see the update.

---

## Next Steps

Now that your local environment is ready, you can move on to:

- **[Deployment](DEPLOYMENT.md)** — Host your portfolio on the web.
- **[Configuration](CONFIGURATION.md)** — Personalize your projects, tech stack, and more.
- **[Theming](THEMING.md)** — Customize colors and fonts.
