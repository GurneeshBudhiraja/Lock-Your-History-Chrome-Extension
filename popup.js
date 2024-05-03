(()=>{
  // Create a new link element
  const controls = document.querySelector(".ytp-right-controls");
  const bookmarkBtn = document.createElement("img");
  bookmarkBtn.src = "https://raw.githubusercontent.com/raman-at-pieces/youtube-bookmarker-starter-code/8e50a103ee60e06cd96cb73cf964bb6ac6d21ac6/assets/bookmark.png";
  bookmarkBtn.style.width = "40px";
  bookmarkBtn.style.height = "40px";
  bookmarkBtn.style.cursor = "pointer";
  bookmarkBtn.style.marginBottom = "3px";
  bookmarkBtn.title = "Bookmark this video";
  controls.prepend(bookmarkBtn);

  
})();