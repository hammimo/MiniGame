const field = document.querySelector('.game__filed');
const fieldRect = field.getBoundingClientRect();
const CarrotSize = 80;
const CarrotCount = 5;
const BugCount = 5;
const GameDurationSec = 5;
const playBtn = document.querySelector('.play__btn');
const GameTimer = document.querySelector('.play__timer');
const gameScore = document.querySelector('.game__score');
const gamePopup = document.querySelector('.game__pop_up');
const popUpText = document.querySelector('.replay__text');
const popUpBtn = document.querySelector('.replay__btn');


// 게임의 상태을 기억하는 부분
let started = false; // 게임이 시작되었는지 안되었는지
let score = 0; //최종적인 점수
let timer = undefined;

field.addEventListener('click', onFiledClick);

playBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
});

popUpBtn.addEventListener('click', ()=> {
    startGame();
    hidePopup();
});

function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
};

function stopGame(){
    started = false;
    hideGameButton();
    showPopUpWithText('Replay❓');
    stopGameTimer(); //실행안됨
};

function finishGame(win){
    started = false;
    hideGameButton();
    showPopUpWithText(win? 'YOU WON 👍' : 'YOU LOST😒');

};

function startGameTimer(){
    let remainingTimeSec = GameDurationSec;
    updateTimerText(remainingTimeSec);
    const timer = setInterval(()=> {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CarrotCount === score);
            return;
        } 
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    GameTimer.innerText =`${minutes} : ${seconds}`
}

function showPopUpWithText(text){
    popUpText.innerText = text;
    gamePopup.classList.remove('replay--hide');
}

function hidePopup(){
    gamePopup.classList.add('replay--hide');
}

function stopGameTimer(){ //실행되지 않음
    clearInterval(timer);
}

function showStopButton(){
    const icon = playBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton(){
    playBtn.style.visibility ='hidden';
}

function showTimerAndScore(){
    GameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame(){
    field.innerHTML = ' '; //새로 시작할때마다 텅텅빈 상태에서 아이템 생성
    gameScore.innerText = CarrotCount;
    addItem('carrot', CarrotCount , 'img/carrot.png');
    addItem('bug', BugCount , 'img/bug.png');
}

function onFiledClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        //carrot!!
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CarrotCount){
            finishGame(true);
        }
    } else if (target.matches('.bug')){
        //bug!! 
        stopGameTimer();
        finishGame(false);
    }
}

function updateScoreBoard(){
    gameScore.innerText = CarrotCount - score;
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






