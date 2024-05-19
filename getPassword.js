let password=null;
let confirmPassword=null;
let answerHint=null;
let infoObject = {};
alert("Welcome to SafeHistory! Please set your password and hint.");
while(true){
  password = prompt("Set your password:");
  if(!password){
    alert("Password cannot be empty");
    continue;
  }
  confirmPassword = prompt("Confirm your password:");
  if(!confirmPassword){
    alert("Confirm Password cannot be empty");
    continue;
  } 
  else if(password !== confirmPassword){
    alert("Passwords do not match");
  } else if(password === confirmPassword){
    while(true){
      answerHint = prompt("Set a hint for your password:");
      if(!answerHint){
        alert("Hint cannot be empty");
        continue;   
      }
      break;
    }
    infoObject = {password: password, answerHint};
    break;
  }
}

if(password && confirmPassword && answerHint){
  chrome.storage.sync.set({infoObject:infoObject})
  .then(()=>{
    alert("Password and hint have been saved successfully.");
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id);
  });
  
  })
  .catch((error)=>{
    alert("Error setting password");
  })
}