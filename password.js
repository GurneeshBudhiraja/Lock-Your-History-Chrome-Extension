(async () => {
  let count = 1;
  while (count >= 0) {
    let resp = prompt("Password?");
    let password = await fetchPassword();

    if (!password) {
      chrome.tabs.update({ url: "getPassword.html" });
      break;
    }

    if (resp === password) {
      chrome.tabs.update({ url: "chrome://history/" });
      break;
    } else if (resp !== password && count === 1) {
      alert("Incorrect password. Hint is your name");
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
    chrome.storage.sync.get(["password"], (result) => {
      resolve(result.password);
    });
  });
}
