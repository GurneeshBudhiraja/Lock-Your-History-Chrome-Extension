let currentVideoURL = "";
let currentVideoID = "";
let bookmarkArray = [];
const fontAwesomeCDN = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
`;



chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, videoURL } = obj;

  if (type === "NEW") {
    currentVideoURL = videoURL;
    currentVideoID = videoURL.split("v=")[1];
    console.log(currentVideoURL);
    console.log(currentVideoID);
    addBookmarkButton();
  }
});

if(!currentVideoURL){
  currentVideoURL = window.location.href;
  currentVideoID = currentVideoURL.includes("youtube.com/watch?v=") && currentVideoURL.split("v=")[1];
  if (currentVideoID){
    addBookmarkButton();
  } else {
    console.log("Not a youtube video");
  }
}
  

async function addBookmarkButton() {
  bookmarkArray = await getLocalStorage();
  console.log(bookmarkArray);
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.className = "bookmark-btn";
  bookmarkBtn.innerHTML = `<i class="fa-solid fa-plus fa-xl" style="color: #74C0FC;"></i> `;
  bookmarkBtn.title = "Bookmark this video";
  bookmarkBtn.style.width = "40px";
  bookmarkBtn.style.height = "40px";
  bookmarkBtn.style.border = "none";
  bookmarkBtn.style.backgroundColor = "transparent";
  bookmarkBtn.style.cursor = "pointer";
  bookmarkBtn.style.position = "relative";
  bookmarkBtn.style.top = "-18px";
  bookmarkBtn.addEventListener("click", bookmarkBtnClickHandler);
  document.head.insertAdjacentHTML("beforeend", fontAwesomeCDN);
  youtubeControls = document.querySelector(".ytp-right-controls");
  if(document.getElementsByClassName("bookmark-btn").length > 0){
    return;
  }
  youtubeControls.prepend(bookmarkBtn);  
}

function bookmarkBtnClickHandler() {
  const bookmarkTime = convertTime(
    document.querySelector(".video-stream").currentTime
  );
  addLocalStorage(bookmarkTime);

}

function convertTime(time) {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

async function addLocalStorage(bookmarkTime) {
  const bookmark = {
    videoID: currentVideoID,
    videoURL: currentVideoURL,
    bookmarkTime,
  };

  // getting the current bookmarks from the storage
  bookmarkArray = await getLocalStorage();
  chrome.storage.sync.set({
    [currentVideoID]: JSON.stringify([...bookmarkArray,bookmark]),
  })
  console.log(bookmarkArray);
  return;
}

function getLocalStorage()  {
  return new Promise((resolve) => {
    chrome.storage.sync.get([currentVideoID], (result) => {
      resolve(result[currentVideoID] ? JSON.parse(result[currentVideoID]) : []);
    });
  });
};
