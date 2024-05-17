let resp = prompt("Password?");
if (resp === "1234") {
  chrome.tabs.update({ url: "chrome://history/" });
} else {
  (async () => {
    await chrome.runtime.sendMessage({ tracker: false });
  })();
  chrome.tabs.update({ url: "https://www.google.com/" });
}
