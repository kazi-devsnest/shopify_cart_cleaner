# Shopify Cart Cleaner

A lightweight Chrome extension to quickly clear the cart on any Shopify store.

## Features

- **One-Click Cleaning**: Instantly removes all items from the cart.
- **Smart Detection**: Automatically detects the store URL and shows a "Connected" status.
- **Clean UI**: Minimalist, modern interface with dark mode.
- **Error Handling**: Graceful handling for non-Shopify sites.

## Installation

1.  **[Clone](https://github.com/kazi-devsnest/shopify_cart_cleaner) or download** this repository.
2.  Open **Google Chrome**.
3.  Navigate to `chrome://extensions`.
4.  Enable **Developer mode** (toggle in the top-right corner).
5.  Click **Load unpacked**.
6.  Select the folder containing the extension files.

## Usage

1.  Navigate to any Shopify store.
2.  Click the **Cart Cleaner** icon in your browser toolbar.
3.  Verify the store URL is displayed correctly.
4.  Click **Clear Cart**.
5.  The extension will clear the cart and show a success message.

## Development

This extension uses:
-   `popup.html`: The UI for the extension.
-   `popup.js`: The logic for clearing the cart.
-   `manifest.json`: The configuration for the extension.

To test changes:
1.  Make edits to the files.
2.  Go to `chrome://extensions`.
3.  Click the **Refresh** button on the Cart Cleaner extension card.

## License

MIT
