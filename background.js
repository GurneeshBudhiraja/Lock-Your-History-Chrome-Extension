const HISTORY_URL_SUFFIX = "://history/";
const REDIRECT_URL = "password.html";

let isHistoryTab = false;
let tracker = false;

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
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    if (tab.url && tab.url.endsWith(HISTORY_URL_SUFFIX)) {
      if (!tracker) {
        tracker = true;
        isHistoryTab = true;
      } else {
        tracker = false;
      }
    } else {
      isHistoryTab = false;
    }
    updateTab();
  });
};

const updateTab = () => {
  if (isHistoryTab) {
    setTimeout(() => {
      chrome.tabs.update({ url: REDIRECT_URL });
    }, 100);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab);
  console.log(request);
  if (!request.tracker) {
    tracker = false;
  }
});

chrome.runtime.onInstalled.addListener(async (details)=>{
  if(details.reason === "update"){
    chrome.tabs.create({url: "getPassword.html"});
  }
})
