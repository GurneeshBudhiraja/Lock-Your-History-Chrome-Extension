// html elements
const cancelButton = document.querySelector(".cancel");
const passwordField = document.querySelector(".passwordField");
const passwordErrorMessage = document.querySelector("#error-message");
const passwordForm = document.querySelector("#passwordForm");
const passwordHint = document.querySelector("#password-hint");

// constants
let enteredPassword = undefined;
let userCredentials = undefined;


(async()=>{
  userCredentials = await fetchPassword();
  if(!userCredentials || !userCredentials.password || !userCredentials.answerHint){
    // if there is no password stored in the local storage return to the password setup page
    setTimeout(() => {
      chrome.tabs.update({ url: "../getPassword/getPassword.html" });
    }, 0);
  }
})();

// checking for the form submit button
passwordForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  if(!passwordField.value.trim()){
    passwordField.value = ""; // removing the value from the password field
    passwordField.focus(); // focusing the password field
    // styles for the password field
    passwordField.style.outline = "2px solid red";
    passwordField.style.marginTop = "0.5rem"; //  reducing the top margin for the password field
    passwordErrorMessage.style.display = "block";
    passwordErrorMessage.innerText = "Password field cannot be empty";
    // clearing the hint text
    passwordHint.innerText = "";
    return;
  } else{
    passwordErrorMessage.style.display = "none";
    passwordField.removeAttribute("style");
    enteredPassword = passwordField.value;
    authenticateUser();
    return;
  }
})


cancelButton.addEventListener("click",()=>{
  // getting the current tab id
  chrome.tabs.getCurrent(function (tab) {
    // remove the tab using the tab id
    chrome.tabs.remove(tab.id);
  });
})


async function authenticateUser() {

  if (enteredPassword?.trim() === userCredentials.password) {
    await sendMessage({message: "unlockHistory" });

    // if the user has entered the right password
    setTimeout(() => {
      chrome.tabs.update({ url: "chrome://history/" });
    }, 0);
    return;
  
  } else { // if the entered password and stored password do not match
    // clearing the password field
    passwordField.value = "";
    // style to the password field
    passwordField.style.outline = "2px solid red";
    passwordField.style.marginTop = "0.5rem";
    // focusing the password field
    passwordField.focus();
    // adding styles to the password error message
    passwordErrorMessage.style.display = "block";
    // error message to display
    passwordErrorMessage.innerText = "Incorrect password, please try again";
    
    passwordHint.innerText = `Hint: ${userCredentials?.answerHint}`; // showing the password hint
  }
}


// fetches password from the local storage and returns the promise
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