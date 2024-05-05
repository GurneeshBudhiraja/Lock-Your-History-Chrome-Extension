let currentVideo = "";
const fontAwesomeCDN = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
`;

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, videoURL } = obj;

  if (type === "NEW") {
    currentVideo = videoURL;
    console.log(currentVideo);
    addBookmarkButton();
  }
});

function addBookmarkButton() {
  document.head.insertAdjacentHTML("beforeend", fontAwesomeCDN);
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.innerHTML = `<i class="fa-solid fa-plus fa-xl" style="color: #74C0FC;"></i> `;
  bookmarkBtn.title = "Bookmark this video";
  bookmarkBtn.style.width = "40px";
  bookmarkBtn.style.height = "40px";
  bookmarkBtn.style.border = "none";
  bookmarkBtn.style.backgroundColor = "transparent";
  bookmarkBtn.style.cursor = "pointer";
  bookmarkBtn.style.position = "relative";
  bookmarkBtn.style.top = "-18px";
  youtubeLeftControls = document.querySelector(".ytp-right-controls");
  youtubeLeftControls.prepend(bookmarkBtn);
  bookmarkBtn.addEventListener("click", bookmarkBtnClickHandler);
}
function bookmarkBtnClickHandler() {
  console.log("Bookmark button clicked");
  const bookmarkTime = convertTime(
    document.querySelector(".video-stream").currentTime
  );
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
