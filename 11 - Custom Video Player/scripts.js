/* First - get our elements - CACHE THE DOM! */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progFill = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle'); //play btn
const skipBtns = player.querySelectorAll('[data-skip]'); //10s skip, 25s skip
const ranges = player.querySelectorAll('.player_slider'); //volume and vid speed

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
    video.currentTime += parseFloat(this.dataset.skip); //"parseFloat" returns an actual time... I think.
}

function handleRangeUpdate() {
    console.log(this.value);
}


/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); //This triggers 'play' or 'pause' on click, AND runs updateButton. Why does the exact same syntax allow us to use a method, when just a line above, it was listening for a keyboard/mouse event?
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipBtns.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


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
