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
    passwordField.value = "";
    passwordErrorMessage.style.display = "block";
    passwordErrorMessage.innerText = "Password field cannot be empty";
    passwordField.focus();
    passwordField.style.outline = "2px solid red";
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
    // if the user has entered the right password
    setTimeout(() => {
      chrome.tabs.update({ url: "chrome://history/" });
    }, 0);
    return;
  
  } else { // if the entered password and stored password do not match
    // clearing the password field
    passwordField.value = "";
    // adding styles to the password error message
    passwordErrorMessage.style.display = "block";
    passwordField.style.outline = "2px solid red";
    // error message to display
    passwordErrorMessage.innerText = "Incorrect password, please try again";
    // focusing the password field
    passwordField.focus();
    passwordHint.innerText = `Password hint: ${userCredentials?.answerHint}`; // showing the password hint
  }
}


function fetchPassword() {
  // output format of the password
  /*
    {
      "answerHint": "this",
      "password": "this"
    }
  */
  return new Promise((resolve) => {
    chrome.storage.sync.get(["infoObject"], (result) => {
      resolve(result.infoObject);
    });
  });
}
