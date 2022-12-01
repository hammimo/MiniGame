export default class Popup {
    constructor(){
         this.gamePopup = document.querySelector('.game__pop_up');
         this.popUpText = document.querySelector('.replay__text');
         this.popUpBtn = document.querySelector('.replay__btn');
         this.popUpBtn.addEventListener('click', ()=>{
            this.onClick && this.onClick();
            this.hide();
         });
    }
    setClickListener(onClick){
        this.onClick = onClick;
    }

    hide(){
        this.gamePopup.classList.add('replay--hide');
    }

    showWithText(text){
        this.popUpText.innerText = text;
        this.gamePopup.classList.remove('replay--hide');
    }
}