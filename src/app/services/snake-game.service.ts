import { Injectable } from '@angular/core';
import { Dimension, GameMovingObject, Vector2D } from './../lib/lib';

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

  private snake = Array<GameMovingObject>();
  private collectible = Array();
  private walls = Array();

  private v: Vector2D;

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
      if (this.snake[0].isLeft()) {
        console.log(x + ' ' + y);
        this.v.goto(x, y);
        this.v.sub(this.snake[0].v_position);
        this.v.normalize();
        this.snake[0].v_direction.gotov(this.v);
      }
      this.start();
    }
  }
  moveInsideRight(x: number, y: number) {
    if (this.running) {

    } else if (this.off) {
      this.insideLeft = false;
      this.init();
    } else {
      if (this.snake[0].isRight()) {
        console.log(x + ' ' + y);
        this.v.goto(x, y);
        this.v.sub(this.snake[0].v_position);
        this.v.normalize();
        this.snake[0].v_direction.gotov(this.v);
      }
      this.start();
    }
  }
  init() {
    this.off = false;
    this.v = new Vector2D();
    this.clear();
    console.log('now create circles and draw all...');
    // create objects class with position, size for start
    this.snake.push(new GameMovingObject(new Vector2D(this.lsize.width / 2, this.lsize.height / 2),
                                          new Vector2D(0, 0), 1, 30, this.insideLeft));
    this.draw();
  }

  // start game
  start() {
    console.log('moving...');
    console.log(this.snake[0].v_direction.X + ' ' + this.snake[0].v_direction.Y);
  }
  // main method
  run() {
    this.clear();
    this.update();
    this.draw();
  }
  // just draw all objects in the game...
  draw() {
    console.log(this.snake);
    for (let i = 0; i < this.snake.length; i++) {
      const e = this.snake[i];
      if (e.isLeft()) {
        this.ctx_left.fillStyle = 'black';
        this.ctx_left.arc(e.v_position.X, e.v_position.Y, e.R, 0, 2 * Math.PI);
        this.ctx_left.fill();
      } else {
        this.ctx_right.fillStyle = 'blue';
        this.ctx_right.arc(e.v_position.X, e.v_position.Y, e.R, 0, 2 * Math.PI);
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
