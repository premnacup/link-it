# Link-It

Link-It is a browser extension that helps you normalize "weird" URLs in selected text and allows you to open or copy them easily via the context menu.

## Features

-   **URL Normalization**: Automatically cleans up URLs by:
    -   Trimming whitespace.
    -   Removing surrounding quotes or brackets.
    -   Fixing common obfuscations like `xhttps://` to `https://`.
-   **Context Menu Integration**:
    -   **Open normalized URL in new tab**: Opens the cleaned URL directly.
    -   **Copy normalized URL**: Copies the cleaned URL to your clipboard.

## Installation

Since this extension is not yet in the Chrome Web Store, you can install it in Developer Mode:

1.  Clone or download this repository.
2.  Open your browser (Chrome, Edge, Brave, etc.) and navigate to `chrome://extensions`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the directory containing `manifest.json` (the root of this repository).

## Usage

1.  Highlight any text that contains a URL (even if it's messy, like `"xhttps://example.com"`).
2.  Right-click the selection.
3.  Choose **Link-It: Open normalized URL in new tab** or **Link-It: Copy normalized URL**.