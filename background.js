// lock tab url
const REDIRECT_URL = "password/password.html";
// feedback form url
const FEEDBACK_FORM_URL = "https://forms.gle/JvJqBj5kYhQE2UJV8"; 

// check if the user is on history tab or not
let isHistoryTab = false;

// onActivated event listener for the chrome tabs
chrome.tabs.onActivated.addListener((activeInfo) => {
  setTimeout(() => {
    checkHistoryTab(activeInfo?.tabId);
  }, 20);
});

// onUpdated event listener for the chrome tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  setTimeout(() => {
    checkHistoryTab(tabId);
  }, 20);
});

// check the history tab using the tabId
const checkHistoryTab = (tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab?.url.includes("chrome://history") && !isHistoryTab) {
      isHistoryTab = true;
      updateTab(tabId);
    } else if (tab?.url === "chrome://history/" && isHistoryTab) {
      return;
    } else {
      isHistoryTab = false;
      return;
    }
  });
};

// Retry logic for updating the tab in case of drag error
const updateTab = (tabId) => {
    chrome.tabs.update(tabId, { url: REDIRECT_URL });
};

// on installation
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "getPassword/getPassword.html" });
  }
});

// on deletion
chrome.runtime.setUninstallURL(FEEDBACK_FORM_URL);

// messaging channel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // message from the password.js to notify background.js to know the user has access to the history tab.
  if (request.message === "unlockHistory") {
    isHistoryTab = true;
    return;
  }
});


