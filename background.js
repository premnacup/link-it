console.log("Link-It background script loaded");

function normalizeWeirdUrl(raw) {
  if (!raw) return null;

  let text = raw.trim();
  text = text.replace(/\s+/g, "");

  // Strip quotes/brackets around selection
  text = text.replace(/^["'(]+|[)"']+$/g, "");

  // xhttps:// -> https://
  text = text.replace(/\bx(https?:\/\/)/i, "$1");

  const final = text.trim();

  // Must look like a URL with at least one dot
  if (!/^https?:\/\/\S+\.\S+/.test(final)) {
    return null;
  }

  return final;
}

// --- Create context menu items once ---

browser.contextMenus.create({
  id: "linkit-open",
  title: "Link-It: Open normalized URL in new tab",
  contexts: ["selection"],
});

browser.contextMenus.create({
  id: "linkit-copy",
  title: "Link-It: Copy normalized URL",
  contexts: ["selection"],
});

// --- Handle clicks ---

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText) return;

  const normalized = normalizeWeirdUrl(info.selectionText);

  console.log("Link-It selection:", info.selectionText, "→", normalized);

  if (!normalized) {
    // Just log for now (no notifications)
    console.warn("Link-It: no valid URL found in selection");
    return;
  }

  if (info.menuItemId === "linkit-open") {
    browser.tabs.create({ url: normalized });
  } else if (info.menuItemId === "linkit-copy") {
    // Clipboard from background is a bit flaky, but we'll try
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(normalized).then(
        () => console.log("Link-It: copied to clipboard", normalized),
        (err) => console.error("Link-It: failed to copy", err)
      );
    } else {
      console.warn("Link-It: navigator.clipboard not available");
    }
  }
});