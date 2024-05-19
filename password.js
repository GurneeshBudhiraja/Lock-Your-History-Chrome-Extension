(async () => {
  let count = 1;
  while (count >= 0) {
    let resp = prompt("Password?");
    let infoObject = await fetchPassword();
    if (!infoObject.password) {
      chrome.tabs.update({ url: "getPassword.html" });
      break;
    }
    if (resp === infoObject.password) {
      chrome.tabs.update({ url: "chrome://history/" });
      break;
    } else if (resp !== infoObject.password && count === 1) {
      alert("Incorrect password. Hint is " + infoObject.answerHint);
      count--;
      continue;
    } else {
      await chrome.runtime.sendMessage({ tracker: false });
      alert("Incorrect password");
      chrome.tabs.getCurrent((tab) => {
        chrome.tabs.remove(tab.id);
      });
      break;
    }
  }
})();

function fetchPassword() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["infoObject"], (result) => {
      resolve(result.infoObject);
    });
  });
}
