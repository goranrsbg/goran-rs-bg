import { Injectable } from '@angular/core';
import { Dimension } from './../lib/lib';

@Injectable()
export class SnakeGameService {

  private lsize: Dimension;
  private rsize: Dimension;

  private ctx_left: CanvasRenderingContext2D;
  private ctx_right: CanvasRenderingContext2D;

  private running: boolean;
  private off: boolean;
  private FPS = 60;
  private insideLeft: boolean;

  constructor() { }

  setLeftSide(width: number, height: number, e: HTMLCanvasElement) {
    this.lsize = new Dimension(width, height);
    this.ctx_left = e.getContext('2d');
  }
  setRightSide(width: number, height: number, e: HTMLCanvasElement) {
    this.rsize = new Dimension(width, height);
    this.ctx_right = e.getContext('2d');
  }
  turnOff() {
    this.off = true;
    this.running = false;
  }
  moveInsideLeft(x: number, y: number) {
    if (this.running) {

    } else if (this.off) {
      this.insideLeft = true;
      this.init();
    } else {
      this.start();
    }
  }
  moveInsideRight(x: number, y: number) {
    if (this.running) {

    } else if (this.off) {
      this.insideLeft = false;
      this.init();
    } else {
      this.start();
    }
  }
  init() {
    this.off = false;
    console.log('game time');
  }

  // start game
  start() {
    console.log('starting...');
    console.log(this.lsize.width + ' ' + this.lsize.height);
    console.log(this.rsize.width + ' ' + this.rsize.height);
  }
  // main method
  run() {

  }
  // set canvas as blank
  clear() {

  }

}
