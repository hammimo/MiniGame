import Popup from './popup.js';
import GameBulder, { Reason } from './game.js';
import * as sound from './sound.js';


const gameFinishBanner = new Popup();
const game = new GameBulder()
    .gameDuration(10)
    .carrotCount(7)
    .bugCount(7)
    .build();


game.setGameStopListener((reason)=>{
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay❓';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON 👍';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST😒';
            sound.playBug();
            break;
        default:
            throw new Error ('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
})



