import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose : 'lose',
    cancel: 'cancel',
});

// Builder Pattern
export default class GameBulder {
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.playBtn = document.querySelector('.play__btn');
        this.GameTimer = document.querySelector('.play__timer');
        this.gameScore = document.querySelector('.game__score');
        this.playBtn.addEventListener('click', () => {
            if(this.started){
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });
        this.gamefield = new Field(carrotCount, bugCount);
        this.gamefield.setClickListener(this.onItemClick);
        this.started = false; 
        this.score = 0; 
        this.timer = undefined;
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    onItemClick = (item) =>{
        if(!this.started){
            return;
        }
        if(item ==='carrot'){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        } else if (item === ('bug')){
            this.stop(Reason.lose);
        }
    }

    start(){
        this.started = true;
        this.initGame();
        sound.playBackGround();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
    };
    
    stop(reason){
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer(); 
        sound.stopPlayBackGround();
        this.onGameStop && this.onGameStop(reason);
    };

    
    startGameTimer(){
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(()=> {
        if(remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.finish(this.CarrotCount === this.score ? Reason.win : Reason.lose);
           return;
        } 
        this.updateTimerText(--remainingTimeSec);
    }, 1000);
    }
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.GameTimer.innerText =`${minutes} : ${seconds}`
    }
    
    
    stopGameTimer(){ 
        clearInterval(this.timer);
    }
    
    showStopButton(){
        const icon = this.playBtn.querySelector('.fa-solid');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.playBtn.style.visibility ='visible';
    }
    
    hideGameButton(){
        this.playBtn.style.visibility ='hidden';
    }
    
    showTimerAndScore(){
        this.GameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    initGame(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gamefield.init();
    }
    
    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
}

    
