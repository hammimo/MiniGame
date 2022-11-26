const field = document.querySelector('.game__filed');
const fieldRect = field.getBoundingClientRect();
const CarrotSize = 80;
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

function initGame(){
    console.log(fieldRect);
    addItem('carrot', 5 , 'img/carrot.png');
    addItem('bug', 5 , 'img/bug.png');
}

function addItem(className, count,imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CarrotSize;
    const y2 = fieldRect.height - CarrotSize;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left =`${x}px`;
        item.style.top = `${y}px`
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

initGame();



