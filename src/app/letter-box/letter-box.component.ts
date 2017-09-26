import { Animation, Letter } from './../lib/lib';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.css']
})
export class LetterBoxComponent implements OnInit {
  
  private _character: Letter;
  
  @ViewChild("letty") l;

  constructor() {}
  
  ngOnInit() {
    
    let pause: number = 100;
    let turns: number = 10;
    let inbetween_pause: number = 1000 / (Letter.lastPosition + 1);
    
    switch(Letter.side) {
      case 0:
        new Animation((<HTMLElement>this.l.nativeElement), pause, turns, this._character.position * inbetween_pause);
        break;
      case 1:
        new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                      (Letter.lastPosition - this._character.position) * inbetween_pause);
        break;
      case 2:
        inbetween_pause *= 2;
        if((Letter.lastPosition + 1) % 2 === 1) {
          let mid: number = (Letter.lastPosition - 1) / 2;
          new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                        (Math.abs(mid - this._character.position)) * inbetween_pause);
        } else {
          let right: number = (Letter.lastPosition + 1) / 2;
          (this._character.position > right - 1)? 
            new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                          (this._character.position - right) * inbetween_pause) : 
            new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                          (right - 1 - this._character.position) * inbetween_pause);
        }
        break;
      case 3:
        inbetween_pause *= 2;
        if((Letter.lastPosition + 1) % 2 === 1) {
          let mid: number = (Letter.lastPosition - 1) / 2;
          new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                        (mid - Math.abs(mid - this._character.position)) * inbetween_pause);
        } else {
          let right: number = (Letter.lastPosition + 1) / 2;
          (this._character.position < right)? 
          new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                        (this._character.position) * inbetween_pause) :
          new Animation((<HTMLElement>this.l.nativeElement), pause, turns, 
                        (Letter.lastPosition - this._character.position) * inbetween_pause);
        }
        break;
      default:
        console.log("has not yet been implemented: "+Letter.side);
        break;
    }
  }

  get char(): Letter {
    return this._character;
  }
  
  @Input()  
  set char(char: Letter) {
    this._character = char;
  }
}
