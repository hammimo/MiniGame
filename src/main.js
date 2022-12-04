import Popup from './popup.js';
import GameBulder from './game.js';


const gameFinishBanner = new Popup();
const game = new GameBulder()
    .gameDuration(10)
    .carrotCount(7)
    .bugCount(7)
    .build();


game.setGameStopListener((reason)=>{
    console.log(reason);
    let message;
    switch (reason) {
        case 'cancel':
            message = 'Replay❓';
            break;
        case 'win':
            message = 'YOU WON 👍';
            break;
        case 'lose':
            message = 'YOU LOST😒';
            break;
        default:
            throw new Error ('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
})



