/* First - get our elements - CACHE THE DOM! */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); //play btn
const skipBtns = player.querySelectorAll('[data-skip]'); //10s skip, 25s skip
const ranges = player.querySelectorAll('.player__slider'); //volume and vid speed
const fullscreenBtn = player.querySelector('.full-screen');

/* Build out the functions. */
/* togglePlay could be written as the following:
const method = video.paused ? 'play' : 'pause';
video[method]();
*/
function togglePlay() {
   if (video.paused) {
       video.play();
   } else {
       video.pause();
   }
}
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'; // "this" can be used here because the entire updateButton function is bound to the "video" with an event listener below.
    toggle.textContent = icon; 
}

function skip() {
    console.log(this.dataset.skip); //where did "dataset" come from?
    video.currentTime += parseFloat(this.dataset.skip); //"parseFloat" converts a string into a true number... I think.
}

function handleRangeUpdate() {
    video[this.name] = this.value; //this says: for the video object, attach the range.volume (or range.playBack) and set it to equal that range's VALUE - which is either volume/speed increase/decrease
  }

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; /* This function divides the video's current time (how much time it's played for)
    by it's full duration, then multiplies that number by 100 to return a percentage - this percentage is how much of the video has been
    played. Then, we update the progress bar's flex basis using dot notation to equal the changing percent variable, which we will set to
    update as the video plays using an event listener below. */
}

function scrub(e) {
    /* To write this function, note the full width of the progress bar you want to update. In this case, it's 640px. So, if we clicked
    320px of the way through the progress bar, we know that we'd want the video to "scrub" to 50%. */
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
//Fullscreen function to be added at a later date!
/* function openFullscreen() {
    if (fullscreenBtn.requestFullscreen) {
        fullscreenBtn.requestFullscreen();
    } else if (fullscreenBtn.webkitRequestFullscreen) {
        fullscreenBtn.webkitRequestFullscreen();
    } else if (fullscreenBtn.msRequestFullscreen) {
        fullscreenBtn.msRequestFullscreen();
    }
}; */

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); //This triggers 'play' or 'pause' on click, AND runs updateButton. Why does the exact same syntax allow us to use a method, when just a line above, it was listening for a keyboard/mouse event?
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipBtns.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
/* The above function provides information about about how to scrub the video bsaed on a user dragging the mouse from one spot to another,
rather than clicking in a new spot. */

// fullscreenBtn.addEventListener('click', openFullscreen);


/* First - get our elements. */

//div class='player' (entire video player)
//div class='progress'
//div class='progress_filled'
//button player_button.toggle
//input.player_slider (volume)
//input.player_slider (video speed)
//button player_button (data-skip='10')
//button player_button (data-skip='25')



/* Build out the functions. */
/* 

A function that PAUSES or PLAYS the video IF the player_button.toggle is clicked OR
the video player is clicked. 
    function playpause(onclick event) { 
        let playPushed = false;
        if (playPushed === false) {
            playPushed === !playPushed;
        };

A function that adjusts the volume based on the position of the player_slider (volume)
        function adjustVol() {
            IF the slider is at X position, volume = Y
            IF the slider++... define a relationship between the slider and the incremental volume increase
            necessary to track "lastPos" of the slider so we know how much to increment the vol?
        }

A function that adjusts the playback speed based on the position of the player_slider (video speed)
        see above :)
A function that skips the video ahead 10 or 25 seconds based on a button click.
        maybe it intakes the current position of the video's playback
        calculates to 10 seconds ahead - "skips" (?) the in-between seconds

        let currentPos = video.current;
        let skipTo = (video.current + 10s);
A function that slides the control bar in on mouseover.
        let barVisible = false;
        function slideInBar(e) {
            if (barVisible) {
                barVisible = !barVisible;
            }
        slideInBar("hover");
*/

/* Hook up the event listeners */
/*
We'll need the following event listeners:
        on hover (mouseover) - control bar slides in
        on click - play/pause
        on mousedown (mousemove??) - adjust volume and video speed
        on click - skip forward 10 or 25 seconds


*/
