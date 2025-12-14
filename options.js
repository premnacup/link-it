const DEFAULT_BASE_URL = "";

async function restoreOptions() {
  const storedOptions = await browser.storage.sync.get({
    defaultBaseUrl: DEFAULT_BASE_URL,
  });

  const settings = {
    defaultBaseUrl: storedOptions.defaultBaseUrl || DEFAULT_BASE_URL,
  };

  document.getElementById("defaultBaseUrl").value = settings.defaultBaseUrl;
  document.getElementById("currentBaseUrl").textContent = settings.defaultBaseUrl;
}

async function saveOptions() {
  const defaultBaseUrlInput = document.getElementById("defaultBaseUrl");
  const defaultBaseUrl = defaultBaseUrlInput.value.trim();
  await browser.storage.sync.set({ defaultBaseUrl });

  const statusElement = document.getElementById("status");
  statusElement.textContent = "Options saved.";
  setTimeout(() => {
    statusElement.textContent = "";
  }, 1500);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);

