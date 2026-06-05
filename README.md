# AREON Research Explorer

This workspace contains the AREON interactive research website for BeteSeb Academy, Ayertena Branch. The site is built with static HTML/CSS/JS and uses a small Express backend for sample chart data and contact form messages.

## Project files
- `index.html` — site homepage
- `about.html`, `publications.html`, `survey.html`, `data.html`, `results.html`, `contact.html` — site pages
- `styles.css` — site styling
- `server.js` — local Node.js server for API endpoints and static hosting
- `package.json` — project dependencies and scripts
- `images/icon.svg` — site icon used for favicon and header logo

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the site locally:
   ```bash
   npm start
   ```
3. Open the browser at `http://localhost:3000`

## VS Code Workspace
Use `areon-research-web.code-workspace` to open the project as a workspace with helpful tasks and a launch configuration.

## Notes
- The icon file is referenced from all pages via the workspace favicon link.
- `messages.json` stores submitted contact form messages locally.
