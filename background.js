chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const videoURL = tab.url;
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoURL,
    });
  }
});