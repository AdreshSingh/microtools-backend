# Microtools Frontend

This folder contains the static frontend for Microtools, a collection of micro-utilities (PDF, image, etc.).

## Structure

- `index.html` — Homepage with a grid of tool cards
- `tools/pdf-compress/index.html` — Compress PDF tool
- `tools/pdf-merge/index.html` — Merge PDF tool
- `tools/jpg-to-pdf/index.html` — Convert JPG to PDF tool
- `tools/resize-image/index.html` — Resize Image tool
- `tools/png-to-jpg/index.html` — Convert PNG to JPG tool
- Each tool page uses a consistent layout, dark mode, and a back button

## Features

- **Dark/Light Mode**: Toggle in the top right, with smooth transitions
- **Consistent Layout**: All tools have the same header, upload box, file list, upload button, and loading spinner/progress bar
- **Responsive Design**: Works on desktop and mobile
- **Accessible**: Keyboard navigation, ARIA labels, visible focus states
- **Easy to Extend**: Add new tools by copying a tool page and updating the title, icon, and file input logic

## Adding a New Tool

1. Copy an existing tool page (e.g., `tools/pdf-compress/index.html`)
2. Update the title, icon, and file input logic as needed
3. Add the new tool to the grid in `index.html`
4. Implement backend integration as needed

## Development

- No frameworks required (HTML, CSS, JS only)
- You can use lightweight libraries if needed for UX
- All pages are static and can be served by any static server or integrated with a backend
