// html elements
const cancelButton = document.querySelector(".cancel");
const passwordField = document.querySelector(".passwordField");
const passwordErrorMessage = document.querySelector("#error-message");
const passwordForm = document.querySelector("#passwordForm");
const passwordHint = document.querySelector("#password-hint");

let enteredPassword = undefined; // password field value
let userCredentials = undefined; // user credentials stored


// fetching the password
fetchPassword().then(userCredentials = (passwordObject)=>{
  userCredentials = passwordObject;
  return;
});

// form submission
passwordForm.addEventListener("submit", (e)=>{
  
  e.preventDefault();
  
  if(!passwordField.value.trim()){
    // checks if the password field is empty or not 
    passwordField.value = ""; // reset the password field
    passwordField.focus(); // focusing the password field
    
    // style for the password field
    passwordField.style.outline = "2px solid red";
    passwordField.style.marginTop = "0.5rem";
    passwordErrorMessage.style.display = "block";
    passwordErrorMessage.innerText = "Password field cannot be empty";
    
    // clearing the hint text if present
    passwordHint.innerText = "";
    return;

  } else{
    // remove the error message from the window
    passwordErrorMessage.style.display = "none";
    
    // removing the style attribute from the password field
    passwordField.removeAttribute("style");

    enteredPassword = passwordField.value;
    authenticateUser();
    return;
  }
})





async function authenticateUser() {
  // checks the similarity of stored password with the entered password
  if (enteredPassword?.trim() === userCredentials.password) {
    
    // sends a message to allow the history tab without the lock
    await sendMessage({message: "unlockHistory" });

    // update the current lock tab with the history tab
    chrome.tabs.update({ url: "chrome://history/" });
    return;
  
  } else { 
    // for invalid user credentials
    
    passwordField.value = ""; // clearing the value of the password field
    passwordField.focus(); // focusing the password field
    
    // styles the password field with a red outline and adjusts the top margin.
    passwordField.style.outline = "2px solid red";
    passwordField.style.marginTop = "0.5rem";

    // updating error message
    passwordErrorMessage.innerText = "Incorrect password, please try again";
    // changing the visibility of the error message
    passwordErrorMessage.style.display = "block";
    
    passwordHint.innerText = `Hint: ${userCredentials?.answerHint}`; // showing the password hint
  }
}

// cancel button
cancelButton.addEventListener("click",()=>{
  // getting the current tab id
  chrome.tabs.getCurrent(function (tab) {
    // remove the tab using the tab id
    chrome.tabs.remove(tab.id);
  });
})

// returns promise after fetching the password 
function fetchPassword() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["infoObject"], (result) => {
      resolve(result.infoObject);
    });
  });
}

// sends message to the background script
async function sendMessage(message) {
  return await chrome.runtime.sendMessage(message);
}