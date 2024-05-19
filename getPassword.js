let password=null;
let confirmPassword=null;
while(true){
  password = prompt("Setup the password");
  if(!password){
    alert("Password cannot be empty");
  }
  confirmPassword = prompt("Confirm the password");
  if(!confirmPassword){
    alert("Password cannot be empty");
  } 
  else if(password !== confirmPassword){
    alert("Passwords do not match");
  } else if(password === confirmPassword){
    break;
  }
}

if(password){
  chrome.storage.sync.set({password: password})
  .then(()=>{
    alert("Password set to "+password);
    chrome.tabs.update({url: "chrome://extensions/"});
  })
  .catch((error)=>{
    alert("Error setting password");
  })
}