import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from '../services/color.service';
import { Game } from './../lib/lib';

@Component({
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @ViewChild('hdr') hdr;
  @ViewChild('cleft') cleft;
  @ViewChild('cright') cright;

  private theGame: Game;

  constructor(private _color: Color) { }

  ngOnInit() {
    this.theGame = new Game(this._color);
    this.setTheGameSize();
  }

  setTheGameSize() {
    let e: HTMLCanvasElement;
    e = <HTMLCanvasElement>this.cleft.nativeElement;
    let box = e.getBoundingClientRect();
    e.width = box.right - box.left;
    e.height = box.bottom - box.top;
    this.theGame.setLeftSide(e.width, e.height, e);

    e = <HTMLCanvasElement>this.cright.nativeElement;
    box = e.getBoundingClientRect();
    e.width = box.right - box.left;
    e.height = box.bottom - box.top;
    this.theGame.setRightSide(e);
  }

  onClick() {
    const hdr: HTMLElement = <HTMLElement>this.hdr.nativeElement;
      hdr.style.setProperty('--color', this._color.generateRandomRbgColor());
  }
  onCanvasClick(e: MouseEvent) {
    const el = <HTMLCanvasElement>e.target;
    if (Game.isRunning()) {
      const box = el.getBoundingClientRect();
      this.theGame.move((e.clientX - box.left), (e.clientY - box.top), el.id === 'leftCanvas');
    } else {
      this.theGame.init(el.id === 'leftCanvas');
    }
  }
}
