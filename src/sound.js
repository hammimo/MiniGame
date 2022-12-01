
const carrotSound = new Audio('sound/carrot_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const bugPullSound = new Audio ('sound/bug_pull.mp3');
const alertSound = new Audio('sound/alert.wav');
const gameWinSound = new Audio ('sound/game_win.mp3');

export function playCarrot(){
    playSound(carrotSound);
}
export function playBackGround(){
    playSound(bgSound);
}
export function playBug(){
    playSound(bugPullSound);
}
export function playAlert(){
    playSound(alertSound);
}
export function playWin(){
    playSound(gameWinSound);
}

export function stopPlayBackGround(){
    stopSound(bgSound);
}


function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}
