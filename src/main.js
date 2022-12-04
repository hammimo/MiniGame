import Popup from './popup.js';
import Game from './game.js';


const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(()=>{
    // startGame();
});



const game = new Game(5, 3, 3);
game.setGameStopListener((reason)=>{
    console.log(reason);
})



