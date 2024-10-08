// lock tab url
const REDIRECT_URL = "password/password.html";
// feedback form url
const FEEDBACK_FORM_URL = "https://forms.gle/h7o716D3rwd8V24t7"; 

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
      // executes when user goes to the history tab for the first time
      updateTab(tabId);
    } else if (tab?.url === "chrome://history/" && isHistoryTab) {
      // executes when the user is redirected to the history tab after the right password has been entered = without this the lock will stay on always on the history tab
      return;
    } else {
      // when the tab is not the history tab
      isHistoryTab = false;
      return;
    }
  });
};

// replace the lock tab with the history tab
const updateTab = (tabId) => {  
  chrome.tabs.update(tabId, { url: REDIRECT_URL });
};

// redirects the user to the getPassword page after the installation
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "getPassword/getPassword.html" });
  }
});

// on deletion
chrome.runtime.setUninstallURL(FEEDBACK_FORM_URL);

// messaging channel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // message from the password.js to notify background.js to know the user has entered the right password to access the history tab.
  if (request.message === "unlockHistory") {
    isHistoryTab = true;
    return;
  }
});


