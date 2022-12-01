
import * as sound from './sound.js';

const CarrotSize = 80;

export default class Field{

    constructor(carrotCount, BugCount){
        this.field = document.querySelector('.game__filed');
        this.fieldRect = this.field.getBoundingClientRect();
        this.CarrotCount = 5;
        this.BugCount = 5;
        this.field.addEventListener('click', this.onClick);

    }

    onClick = (event) => {
        const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        sound.playCarrot();
        this.onItemClick && this.onItemClick('carrot');
        }
         else if (target.matches('.bug')){
        this.onItemClick && this.onItemClick('bug');
            }
        }

    _addItem(className, count,imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CarrotSize;
        const y2 = this.fieldRect.height - CarrotSize;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left =`${x}px`;
            item.style.top = `${y}px`
            this.field.appendChild(item);
        }
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
    init(){
        this.field.innerHTML = ' ';
        this._addItem('carrot', this.CarrotCount , 'img/carrot.png');
        this._addItem('bug', this.BugCount , 'img/bug.png');

    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}