const password = prompt("Setup the password");
if(password){
  chrome.storage.sync.set({password: password})
  .then(()=>{
    alert("Password set");
    chrome.tabs.update({url: "brave://history/"});
  })
  .catch((error)=>{
    alert("Error setting password");
  })
}