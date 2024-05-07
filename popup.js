let currentTabURL = "";
let currentTabID = "";
let bookmarkArray = [];

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  const tab = await getCurrentTab();
  if(tab.url && tab.url.includes("youtube.com/watch")){
    currentTabURL = tab.url;
    currentTabID = tab.url.split("v=")[1];
    document.querySelector("#heading").textContent = "Bookmarks for the video";
    const bookmarkArray = await getLocalStorage();    
    if(bookmarkArray.length > 0){
      displayBookmarks(bookmarkArray);
    }
  } else {
    document.querySelector("#heading").textContent = "Not a youtube video!";
    document.querySelector("#heading").style.textAlign = "center";
    document.querySelector(".instructions").textContent = "Please open a youtube video to bookmark it.";
  }
})

function displayBookmarks(bookmarkArray) {
  const div = document.querySelector("#bookmarks");
  div.innerHTML = ""; // Clear existing content
  console.log(bookmarkArray);
  bookmarkArray.forEach((bookmark) => {
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.classList.add(`bookmark-${bookmark.bookmarkTime}`,"bookmark");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash");
    trashIcon.style.color = "#FF6347";
    trashIcon.setAttribute("aria-hidden", "true");
    trashIcon.addEventListener('click',trashIconClickHandler);    

    const bookmarkText = document.createElement("span");
    bookmarkText.textContent = ` Bookmark at ${bookmark.bookmarkTime}`;

    bookmarkDiv.appendChild(bookmarkText);
    bookmarkDiv.appendChild(trashIcon);

    div.appendChild(bookmarkDiv);
  });
}
function trashIconClickHandler(e) {
  const parentDiv = e.target.parentElement;
  const bookmarkTime = parentDiv.querySelector("span").innerText.split(" ")[2];
  parentDiv.remove();
  console.log(bookmarkArray);
  // Filter the bookmarkArray to remove the bookmark with the specified bookmarkTime
  bookmarkArray.map((bookmark)=>{
    console.log(bookmark);
  })
  console.log(bookmarkArray);
  
  // Save the updated bookmarkArray to Chrome storage
  // chrome.storage.sync.set({ [currentTabID]: JSON.stringify(bookmarkArray) });
  
  // Update the displayed bookmarks
  // displayBookmarks(bookmarkArray);
}


function getLocalStorage()  {
  return new Promise((resolve) => {
    chrome.storage.sync.get([currentTabID], (result) => {
      resolve(result[currentTabID] ? JSON.parse(result[currentTabID]) : []);
    });
  });
};
