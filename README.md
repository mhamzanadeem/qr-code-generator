# QR Code Generator

A minimal, browser-based QR code generator built with plain HTML, CSS, and JavaScript.

## Features

- Generate QR codes from arbitrary text or URLs.
- Responsive, lightweight UI using `index.html`, `style.css`, and `script.js`.
- Works offline — no build step required.

## Files

- `index.html` — Main UI.
- `style.css` — Styles for the app.
- `script.js` — QR code generation logic.

## Quick Start

1. Clone or download the project folder to your machine.
2. Open `index.html` in a browser (double-click or use your browser's "Open File").

## Usage

1. Type or paste the text / URL you want to encode into the input field.
2. Click the Generate button.
3. The QR code will appear on the page. Right-click or use the provided download button (if available) to save the image.

## Development

- Edit `script.js` to change generation logic or add options (size, error correction).
- Edit `style.css` to adjust layout and theming.
- No build tools required — changes take effect by refreshing the browser.

## Testing

- Manual testing: open `index.html` and try sample values (URLs, plain text, long text).

## Troubleshooting

- If the QR does not render, open the browser console to check for errors from `script.js`.
- If images are blocked when opening the file directly, run a local server as described above.
