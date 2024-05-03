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
  bookmarkBtn.addEventListener("click", youtubeBookmarker);
  

  function youtubeBookmarker (){
    const time = document.getElementsByClassName("video-stream")[0].currentTime
    const currentTime =  convertTime(time);
    
  }
  
  // Function to convert seconds to YouTube format
  function convertTime(seconds){
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Format the time components with leading zeros if necessary
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Concatenate the formatted components into the YouTube format
    let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    
    return formattedTime;
  }
    

})();