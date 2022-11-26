const playBtn = document.querySelector('.play__btn');
const timer = document.querySelector('.play__timer');
const countCarrot = document.querySelector('.carrot__num');
const stopBtn = document.querySelector('.stop__btn');

playBtn.addEventListener('click', () => {
    startTimer();
});


// Timer
let time = 60000;
let min = 1;
let sec = 60;
function startTimer (){
    playTime =setInterval(function () {
        time = time - 1000;
        min = time/(60*1000);

        if(sec > 0){
            sec = sec-1;
            timer.value=Math.floor(min)+ ':' + sec;
        }
        if(sec ===0) {
            sec=60;
            timer.value = Math.floor(min) + ':' + '00';
        }
    }, 1000);
}



