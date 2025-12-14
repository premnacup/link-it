console.log("Link-It background script loaded");

function normalizeUrl(text) {
  if (typeof text !== "string") return null;

  domainOnly = /^\w*\.com.*/gi;
  pathOnly = /^w*\/.*\//gi;

  text = text.trim().replace(/\s+/g, "");

  // Remove quotes and brackets around the selection
  text = text.replace(/["'()"]/g, "");

  if (text.match(domainOnly)) {
    console.log("Link-It: domain only");
    text = "https://" + text;
    return text;
  }
  // Replace xhttps:// with https://
  text = text.replace(/^\w*(https?:\/+)/gi, "$1");

  const normalizedText = text.trim();

  // Must look like a URL with at least one dot
  if (!/^https?:\/\/\S+\.\S+/.test(normalizedText)) {
    return null;
  }

  return normalizedText;
}

// --- Create context menu items ---
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

browser.contextMenus.create({
  id: "linkit-open-default",
  title: "Link-It: Open normalized URL in new tab (default base URL)",
  contexts: ["selection"],
});

// --- Handle clicks ---
browser.contextMenus.onClicked.addListener((info) => {
  if (!info.selectionText) return;

  const normalized = normalizeUrl(info.selectionText);

  console.log("Link-It selection:", info.selectionText, "→", normalized);

  if (!normalized) {
    console.warn("Link-It: no valid URL found in selection");
    browser.notifications
      .create({
        type: "basic",
        title: "Link-It",
        message: "No valid URL found in selection",
        iconUrl: browser.runtime.getURL("icons/icon-128.png"),
      })
      .catch((err) =>
        console.error("Link-It: failed to show notification", err)
      );
    return;
  }

  switch (info.menuItemId) {
    case "linkit-open":
      browser.tabs.create({ url: normalized });
      break;
    case "linkit-copy":
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(normalized);
      } else {
        const notification = browser.notifications.create({
          type: "basic",
          title: "Link-It",
          message: "navigator.clipboard not available",
          iconUrl: browser.runtime.getURL("icons/icon-128.png"),
        });
        notification.catch((err) =>
          console.error("Link-It: failed to show notification", err)
        );
      }
      break;
    case "linkit-open-default":
      browser.tabs.create({ url: info.selectionText });
      break;
    default:
      break;
  }
});
