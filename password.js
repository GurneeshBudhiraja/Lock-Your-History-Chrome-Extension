let resp = prompt("Password?");
console.log(typeof resp);

(async () => {
  let password = await fetchPassword();
  if (!password) {
    chrome.tabs.update({ url: "getPassword.html" });
  } else {
    console.log(password);
    if (resp === password) {
      chrome.tabs.update({ url: "chrome://history/" });
    } else {
      await chrome.runtime.sendMessage({ tracker: false });
      alert("Incorrect password");
      chrome.tabs.getCurrent((tab) => {
        chrome.tabs.remove(tab.id);
      });
    }
  }
})();

function fetchPassword(){
  return new Promise((resolve) => {
    chrome.storage.sync.get(["password"], (result) => {
      resolve(result.password);
    });
  });
};
