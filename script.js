
function searchVideos (searchBarText) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(xhttp.responseText);
        console.log(res.items[1]);
        var videoData = res.items.map(item => {
            console.log("This is what gets returned in the 1st " + item.snippet)
            return item
        })
        
        var container = document.querySelector(".vid-divs")
        container.innerHTML = "";
        videoData.forEach(video => {
            var videoDiv = document.createElement("div");
            videoDiv.classList.add("video-div");
            videoDiv.innerHTML = `<a href="https://www.youtube.com/watch?v=${video.id.videoId}}" target="_blank"><img class="thumbnail" src=${video.snippet.thumbnails.high.url}>
                                    <div class="video-description">
                                    <h4 class="video-title">${video.snippet.title}</h4>
                                    <p>${video.snippet.channelTitle}</p>
                                    </div></a>`

            container.appendChild(videoDiv);
        })   
    }
};

// var searchBarText = document.querySelector("#search-bar").value
    var API_URL =  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchBarText}&maxResults=12&type=video&videoCaption=closedCaption&key=AIzaSyACby94zd3x1QtwT8Yg24I8XpZ1EMGHJN4`;

    xhttp.open("GET", API_URL, true);
    xhttp.send();
}

var tagBtn = document.querySelectorAll(".tag-btn");
console.log(tagBtn)
tagBtn.forEach(el => el.addEventListener("click", function(e){
    if (e.currentTarget.innerHTML === "All") {
        searchVideos()
    } else {
        searchVideos(e.currentTarget.innerHTML);
    }
    tagBtn.forEach(removeActive => {
        removeActive.classList.remove("active-btn")
    })
    e.currentTarget.classList.add("active-btn");

}))

var ytDiv = document.querySelectorAll(".yt-icon-div")
ytDiv.forEach(el => el.addEventListener("click",function(e){
    ytDiv.forEach(item => {
        item.classList.remove("active-yt-div")
    })
    e.currentTarget.classList.add("active-yt-div");
}))


searchVideos();

var searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit",function(e){
    e.preventDefault();
    searchVideos(document.querySelector("#search-bar").value)
})



