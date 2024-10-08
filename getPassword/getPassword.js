let password = null;
let confirmPassword = null;
let answerHint = null;
let infoObject = {};

alert("Welcome to Lock Your History! Please set your password and hint.");

while (true) {
  // password prompt
  password = prompt("Set your password:")?.trim();
  if (!password) {
    // checks for the empty password
    alert("Password cannot be empty");
    continue;
  }
  // confirm password prompt
  confirmPassword = prompt("Confirm your password:")?.trim();
  if (!confirmPassword) {
    // checks for the empty confirm password
    alert("Confirm Password cannot be empty");
    continue;
  } else if (password !== confirmPassword) {
    // checks the password dissimilarity
    alert("Passwords do not match");
  } else if (password === confirmPassword) {
    // checks the password similarity
    while (true) {
      // hint prompt
      answerHint = prompt("Set a hint for your password:")?.trim();
      if (!answerHint) {
        // checking for the empty hint
        alert("Hint cannot be empty");
        continue;
      }
      break;
    }
    break;
  }
}

if (password && confirmPassword && answerHint) {
  // combining the password and hint into an object
  infoObject = { password: password, answerHint };
  
  // saving the password and hint in the local storage
  chrome.storage.sync
    .set({ infoObject: infoObject })
    .then(() => {
      // alert success message
      alert("Password and hint have been saved successfully.");
      // removing the getPassword.html page from the browser
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id);
      });
    })
    .catch((error) => {
      // error message
      alert("Error setting password");
    });
}
