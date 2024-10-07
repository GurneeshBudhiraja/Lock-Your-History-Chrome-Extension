const HISTORY_URL_SUFFIX = "://history/";
const REDIRECT_URL = "password/password.html";
// TODO: will change this url before pushing to the github repository
const FEEDBACK_FORM_URL = "FORM_URL"; 

let tracker = true;


chrome.tabs.onActivated.addListener((activeInfo) => {
  checkHistoryTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    checkHistoryTab(tabId);
  }
});

const checkHistoryTab = (tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    if(tab.url==="chrome://history/" && tracker){
      console.log(tab.url);
      updateTab();
    }
    else{
      return;
    }
  });
};

const updateTab = () => {
  tracker = false;
  setTimeout(() => {
    chrome.tabs.update({ url: REDIRECT_URL });
    }, 0);
  
};

// on installation
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "getPassword/getPassword.html" });
  }
});

// on deletion
chrome.runtime.setUninstallURL(FEEDBACK_FORM_URL);