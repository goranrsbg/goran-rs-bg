import { Injectable } from '@angular/core';
import { Dimension, GameObject, Vector2D } from './../lib/lib';

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

  private objects = Array<GameObject>();

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
    this.ctx_left.clearRect(0, 0, this.lsize.width, this.lsize.height);
    this.ctx_right.clearRect(0, 0, this.rsize.width, this.rsize.height);
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
    this.clear();
    console.log('now create circles and draw all...');
    // create objects class with position, size for start
    GameObject.r = 30;
    this.objects.push(new GameObject(new Vector2D(this.lsize.width / 2, this.lsize.height / 2), this.insideLeft));
    this.draw();
  }

  // start game
  start() {
    console.log('starting...');
    console.log(this.lsize.width + ' ' + this.lsize.height);
    console.log(this.rsize.width + ' ' + this.rsize.height);
  }
  // main method
  run() {
    this.clear();
    this.update();
    this.draw();
  }
  // just draw all objects in the game...
  draw() {
    let e: GameObject;
    for (let i = 0; i < this.objects.length; i++) {
      e = this.objects[i];
      console.log(e);
      if (e.isLeft()) {
        this.ctx_left.fillStyle = 'black';
        this.ctx_left.arc(e.pos.X, e.pos.Y, GameObject.r, 0, 2 * Math.PI);
        this.ctx_left.fill();
      } else {
        this.ctx_right.fillStyle = 'black';
        this.ctx_right.arc(e.pos.X, e.pos.Y, GameObject.r, 0, 2 * Math.PI);
        this.ctx_right.fill();
      }
    }
  }
  // prepare new positions...
  update() {

  }
  // repaint canvas with white...
  clear() {
    this.ctx_left.fillStyle = 'white';
    this.ctx_left.fillRect(0, 0, this.lsize.width, this.lsize.height);
    this.ctx_right.fillStyle = 'white';
    this.ctx_right.fillRect(0, 0, this.rsize.width, this.rsize.height);
  }

}
