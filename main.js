const field = document.querySelector('.game__filed');
const fieldRect = field.getBoundingClientRect();
const CarrotSize = 80;
const CarrotCount = 5;
const BugCount = 5;
const playBtn = document.querySelector('.play__btn');
const timer = document.querySelector('.play__timer');
const gameScore = document.querySelector('.game__score');


// 게임의 상태을 기억하는 부분
let started = false; // 게임이 시작되었는지 안되었는지
let score = 0; //최종적인 점수

playBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});


function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
};

function startGameTimer(){

}; 

function stopGame(){

};
function showStopButton(){
    const icon = playBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore(){
    timer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame(){
    field.innerHTML = ' '; //새로 시작할때마다 텅텅빈 상태에서 아이템 생성
    gameScore.innerText = CarrotCount;
    addItem('carrot', CarrotCount , 'img/carrot.png');
    addItem('bug', BugCount , 'img/bug.png');
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

function removeItem(){

}





