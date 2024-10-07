let password = null;
let confirmPassword = null;
let answerHint = null;
let infoObject = {};

alert("Welcome to Lock Your History! Please set your password and hint.");

while (true) {
  // password
  password = prompt("Set your password:")?.trim();
  if (!password) {
    alert("Password cannot be empty");
    continue;
  }
  // confirm password
  confirmPassword = prompt("Confirm your password:")?.trim();
  if (!confirmPassword) {
    alert("Confirm Password cannot be empty");
    continue;
  } else if (password !== confirmPassword) {
    // if the password and confirm password are not the same
    alert("Passwords do not match");
  } else if (password === confirmPassword) {
    while (true) {
      // setting the hint for the password
      answerHint = prompt("Set a hint for your password:")?.trim();
      if (!answerHint) {
        // checking for the empty hint
        alert("Hint cannot be empty");
        continue;
      }
      break;
    }
    infoObject = { password: password, answerHint };
    break;
  }
}

if (password && confirmPassword && answerHint) {
  // saving the password, confirm password and hint in the local storage
  chrome.storage.sync
    .set({ infoObject: infoObject })
    .then(() => {
      // success message
      alert("Password and hint have been saved successfully.");
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id);
      });
    })
    .catch((error) => {
      // error message
      alert("Error setting password");
    });
}
