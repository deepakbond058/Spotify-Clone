console.log("Welcome to spotify");

//Initialising the variables
let songIndex=1;
let audioElement = new Audio(`songs/${songIndex}.mp3`);
let masterPlay=document.getElementById("masterPlay");
let previous=document.getElementById("previous");
let next=document.getElementById("next");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songInfo=document.getElementById("songInfo");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let songItemPlay=Array.from(document.getElementsByClassName("songItemPlay"));


let songs=[
    {songName:"Let me love you-1", fileName:"songs/1.mp3", coverPath:"covers/10.jpg"},
    {songName:"Let me love you-2", fileName:"songs/2.mp3", coverPath:"covers/1.jpg"},
    {songName:"Let me love you-3", fileName:"songs/3.mp3", coverPath:"covers/2.jpg"},
    {songName:"Let me love you-4", fileName:"songs/4.mp3", coverPath:"covers/3.jpg"},
    {songName:"Let me love you-5", fileName:"songs/5.mp3", coverPath:"covers/4.jpg"},
    {songName:"Let me love you-6", fileName:"songs/6.mp3", coverPath:"covers/5.jpg"}
];

songItems.forEach((element, i) => {
    // console.log(element.getElementsByTagName("img"));
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

//Handle play/pause
masterPlay.addEventListener("click", ()=> {
    if(audioElement.paused ){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        songInfo.innerText=songs[songIndex-1].songName;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
        songInfo.innerText=songs[songIndex-1].songName;
    }
    
});

//listen to events
audioElement.addEventListener("timeupdate", ()=>{
    // console.log("timeupdate");
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    console.log(songIndex);
    myProgressBar.value = progress;    
});

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});

const makeallplay=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}


songItemPlay.forEach((element)=>{
    element.addEventListener("click",(event)=>{
        if(audioElement.paused){

            makeallplay();
            // console.log(event.target);
            // same as console.log(element);   
            
            songIndex = event.target.id;
            event.target.classList.remove("fa-circle-play");
            event.target.classList.add("fa-circle-pause");
        audioElement.src=`songs/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        songInfo.innerText=songs[songIndex-1].songName;
    }
    else{
        makeallplay();
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
    }
})
})

previous.addEventListener("click",()=>{
    songIndex--;
    if(songIndex==0)
    songIndex=6;
    
    makeallplay();
    songItemPlay[songIndex-1].classList.remove("fa-circle-play");
    songItemPlay[songIndex-1].classList.add("fa-circle-pause");
    
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    songInfo.innerText=songs[songIndex-1].songName;
});

next.addEventListener("click", ()=>{
    songIndex++;
    if(songIndex==7)
    songIndex=1;
    
    makeallplay();
    songItemPlay[songIndex-1].classList.remove("fa-circle-play");
    songItemPlay[songIndex-1].classList.add("fa-circle-pause");
    
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    songInfo.innerHTML=songs[songIndex-1].songName;
});
