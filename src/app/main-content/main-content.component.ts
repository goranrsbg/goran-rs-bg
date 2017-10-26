import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from '../services/color.service';
import { SnakeGameService } from './../services/snake-game.service';

@Component({
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @ViewChild('hdr') hdr;
  @ViewChild('cleft') cleft;
  @ViewChild('cright') cright;

  constructor(private _color: Color, private theGame: SnakeGameService) { }

  ngOnInit() {
    this.setTheGameSize();
    this.theGame.turnOff();
  }

  setTheGameSize() {
    let e: HTMLCanvasElement;
    e = <HTMLCanvasElement>this.cleft.nativeElement;
    let box = e.getBoundingClientRect();
    e.width = box.right - box.left;
    e.height = box.bottom - box.top;
    this.theGame.setLeftSide(box.right - box.left, box.bottom - box.top, e);

    e = <HTMLCanvasElement>this.cright.nativeElement;
    box = e.getBoundingClientRect();
    e.width = box.right - box.left;
    e.height = box.bottom - box.top;
    this.theGame.setRightSide(box.right - box.left, box.bottom - box.top, e);
  }

  onClick() {
    const hdr: HTMLElement = <HTMLElement>this.hdr.nativeElement;
      hdr.style.setProperty('--color', this._color.generateRandomRbgColor());
  }
  onLeftCanvasClick(e: MouseEvent) {
    const el = <HTMLCanvasElement>this.cleft.nativeElement;
    const box = el.getBoundingClientRect();
    this.theGame.moveInsideLeft((e.clientX - box.left), (e.clientY - box.top));
  }
  onRightCanvasClick(e: MouseEvent) {
    const el = <HTMLCanvasElement>this.cright.nativeElement;
    const box = el.getBoundingClientRect();
    this.theGame.moveInsideRight((e.clientX - box.left), (e.clientY - box.top));
  }

}
