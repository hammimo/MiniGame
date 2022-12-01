import Popup from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const field = document.querySelector('.game__filed');
const fieldRect = field.getBoundingClientRect();
const CarrotSize = 80;
const CarrotCount = 5;
const BugCount = 5;
const GameDurationSec = 5;
const playBtn = document.querySelector('.play__btn');
const GameTimer = document.querySelector('.play__timer');
const gameScore = document.querySelector('.game__score');




// 게임의 상태을 기억하는 부분
let started = false; // 게임이 시작되었는지 안되었는지
let score = 0; //최종적인 점수
let timer = undefined;

const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(()=>{
    startGame();
});

const gamefield = new Field(CarrotCount, BugCount);
gamefield.setClickListener(onItemClick);

function onItemClick(item){
    if(!started){
        return;
    }
    if(item ==='carrot'){
        score++;
        updateScoreBoard();
        if(score === CarrotCount){
            finishGame(true);
        }
    } else if (item === ('bug')){
        finishGame(false);
    }
}

field.addEventListener('click', onItemClick);

playBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
});


function startGame(){
    started = true;
    initGame();
    sound.playBackGround();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
};

function stopGame(){
    started = false;
    hideGameButton();
    gameFinishBanner.showWithText('Replay❓');
    stopGameTimer(); 
    sound.stopPlayBackGround();
    sound.playAlert();
};

function finishGame(win){
    started = false;
    hideGameButton();
    if(win){
        sound.playWin();
    }else {
        sound.playBug();
    }
    sound.stopPlayBackGround();
    gameFinishBanner.showWithText(win? 'YOU WON 👍' : 'YOU LOST😒');
};

function startGameTimer(){
    let remainingTimeSec = GameDurationSec;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=> {
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


function stopGameTimer(){ 
    clearInterval(timer);
}

function showStopButton(){
    const icon = playBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    playBtn.style.visibility ='visible';
}

function hideGameButton(){
    playBtn.style.visibility ='hidden';
}

function showTimerAndScore(){
    GameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame(){
    score = 0;
    gameScore.innerText = CarrotCount;
    gamefield.init();
}

function updateScoreBoard(){
    gameScore.innerText = CarrotCount - score;
}




