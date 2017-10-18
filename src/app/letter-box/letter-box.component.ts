import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Animation, Letter } from './../lib/lib';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.css']
})
export class LetterBoxComponent implements OnInit {

  private _character: Letter;

  @ViewChild('letty') l;

  constructor() {}

  ngOnInit() {

    const pause = 100;
    const turns = 10;
    let inbetween_pause: number = 1000 / (Letter.lastPosition + 1);
    const e: HTMLElement = <HTMLElement>this.l.nativeElement;

    switch (Letter.side) {
      case 0:
        // tslint:disable-next-line:no-unused-expression
        new Animation(e, pause, turns, this._character.position * inbetween_pause);
        break;
      case 1:
        // tslint:disable-next-line:no-unused-expression
        new Animation(e, pause, turns, (Letter.lastPosition - this._character.position) * inbetween_pause);
        break;
      case 2:
        inbetween_pause *= 2;
        if ((Letter.lastPosition + 1) % 2 === 1) {
          const mid: number = (Letter.lastPosition - 1) / 2;
          // tslint:disable-next-line:no-unused-expression
          new Animation(e, pause, turns, (Math.abs(mid - this._character.position)) * inbetween_pause);
        } else {
          const right: number = (Letter.lastPosition + 1) / 2;
          // tslint:disable-next-line:no-unused-expression
          (this._character.position > right - 1) ?
            new Animation(e, pause, turns, (this._character.position - right) * inbetween_pause) :
            new Animation(e, pause, turns, (right - 1 - this._character.position) * inbetween_pause);
        }
        break;
      case 3:
        inbetween_pause *= 2;
        if ((Letter.lastPosition + 1) % 2 === 1) {
          const mid: number = (Letter.lastPosition - 1) / 2;
          // tslint:disable-next-line:no-unused-expression
          new Animation(e, pause, turns, (mid - Math.abs(mid - this._character.position)) * inbetween_pause);
        } else {
          const right: number = (Letter.lastPosition + 1) / 2;
          // tslint:disable-next-line:no-unused-expression
          (this._character.position < right) ?
          new Animation(e, pause, turns, (this._character.position) * inbetween_pause) :
          new Animation(e, pause, turns, (Letter.lastPosition - this._character.position) * inbetween_pause);
        }
        break;
      default:
        console.log('has not yet been implemented: ' + Letter.side);
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
