import { Color } from './../services/color.service';

export class Animation {
  private static instances = new Array<Animation>();
          static UPDATE = 10;
  private static _timer_id: any = false;

  private _ticks: number;
  private _count: number;
  private _ticks_delay: number;

  constructor(private _e: HTMLElement, private _delay_ms: number, private _repeat_times: number,
              private _initial_delay_ms: number) {
    this._ticks = this._delay_ms / Animation.UPDATE;
    this._ticks_delay = this._initial_delay_ms / Animation.UPDATE;
    this._count = 0;
    Animation.instances.push(this);
    if (Animation._timer_id === false) {
      Animation.startAnimations();
    }
  }

  private static ontick() {
    if (Animation.instances.length > 0) {
      Animation.instances.forEach(function(e: Animation) {
        e.tick();
      });
    } else {
      Animation.stopAnimations();
    }
  }

  static startAnimations() {
    Animation._timer_id = setInterval(Animation.ontick, Animation.UPDATE);
  }

  static stopAnimations() {
    clearInterval(Animation._timer_id);
    Animation.instances.length = 0;
    Animation._timer_id = false;
  }

  static isRunning(): boolean {
    return Animation._timer_id !== false;
  }

  private tick() {

    this._ticks_delay--;

    if (this._ticks_delay <= 0) {
      if (this._count >= this._ticks) {
        this._e.style.opacity = (Number(this._e.style.opacity) - 0.1) + '';
        this._repeat_times--;
        if (this._repeat_times <= 0) {
          Animation.instances.splice(Animation.instances.indexOf(this), 1);
        }
        this._count = 0;
      }
    }

    this._count++;

  }

}

export class Letter {

  static side: number;
  static lastPosition: number;

  constructor(private _sign: string, private _postion: number) {}

  get sign(): string {
      return this._sign;
  }

  get position(): number {
      return this._postion;
  }
}

export interface Data {
    name: string;
    askAndLearn: string;
}

export class Dimension {
  constructor(private _width: number = 0, private _height: number = 0) {
  }
  get width(): number {
    return this._width;
  }
  get height(): number {
    return this._height;
  }
}

export class GameObject {
  constructor(public v_position: Vector2D, public v_direction: Vector2D, private speed: number,
              private r: number, private _side: boolean, private _color: string) {}
  move() {
    this.v_position.add(this.v_direction.scale(this.speed));
  }
  changeSpeed(v: number) {
    this.speed += v;
  }
  changeR(n: number) {
    this.r += n;
  }
  changeSide() {
    this._side = !this._side;
  }
  get side() {
    return this._side;
  }
  get R(): number {
    return this.r;
  }
  get color(): string {
    return this._color;
  }
  set side(side: boolean) {
    this._side = side;
  }
  set R(r: number) {
    this.r = r;
  }
  set color(color: string) {
    this._color = color;
  }
}

export class Vector2D {
  private x: number;
  private y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
  get X(): number {
    return this.x;
  }
  get Y(): number {
    return this.y;
  }
  set X(x: number) {
    this.x = x;
  }
  set Y(y: number) {
    this.y = y;
  }
  add(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
  }
  sub(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;
  }
  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  mag2(): number {
    return this.x * this.x + this.y * this.y;
  }
  scale(n: number): this {
    this.x *= n;
    this.y *= n;
    return this;
  }
  normalize() {
    if (this.mag() !== 0) {
      this.scale(1 / this.mag());
    }
  }
  limit(n: number) {
    if (this.mag() > n) {
      this.scale(n / this.mag());
    }
  }
  goto(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Game {

  static theGameInstance: Game;
  static timerId: any;
  static FPS = 60;

  private dimension: Dimension;
  private ctx_left: CanvasRenderingContext2D;
  private ctx_right: CanvasRenderingContext2D;

  private snake = Array<GameObject>();
  private collectible = Array<GameObject>();
  private walls = Array<GameObject>();

  private pom: GameObject;

  constructor(private _color: Color) {
    Game.timerId = false;
    Game.theGameInstance = this;
    this.pom = new GameObject(new Vector2D(), null, 0, 0, true, 'none');
  }

  // start game
  static start() {
    Game.timerId = setInterval(() => { Game.theGameInstance.run(); }, 1000 / Game.FPS);
    console.log('moving... ' + this.timerId);
  }
  static stopTheGame() {
    clearInterval(Game.timerId);
    Game.timerId = false;
  }
  static isRunning(): boolean {
    return Game.timerId !== false;
  }
  setLeftSide(width: number, height: number, e: HTMLCanvasElement) {
    this.dimension = new Dimension(width, height);
    this.ctx_left = e.getContext('2d');
  }
  setRightSide(e: HTMLCanvasElement) {
    this.ctx_right = e.getContext('2d');
  }
  gameOver() {
    Game.stopTheGame();
    this.ctx_left.clearRect(0, 0, this.dimension.width, this.dimension.height);
    this.ctx_right.clearRect(0, 0, this.dimension.width, this.dimension.height);
    this.clear('rgba(0,0,0,0)');
  }
  isOutside(v: Vector2D): boolean {
    return v.X < 0 || v.Y < 0 || v.X > this.dimension.width || v.Y > this.dimension.height;
  }
  isCloseToEdge(e: GameObject): boolean {
    const v = e.v_position;
    return this.dimension.width - v.X < e.R || v.X < e.R || this.dimension.height - v.Y < e.R || v.Y < e.R;
  }
  // calculate reflection for object inside canvas
  reflect(e: GameObject) {
    const v = e.v_position;
    if (v.X < 0) {
      v.X += this.dimension.width;
      if (!e.side) { e.changeSide(); }
    } else if (v.X > this.dimension.width) {
      v.X -= this.dimension.width;
      if (e.side) { e.changeSide(); }
    } else {
      v.X = this.dimension.width - v.X;
    }
    if (v.Y < 0) {
      v.Y += this.dimension.height;
    } else if (v.Y > this.dimension.height) {
      v.Y -= this.dimension.height;
    } else {
      v.Y = this.dimension.height - v.Y;
    }
  }
  shadow(e: GameObject) {
    const v = e.v_position;
    const u = this.pom.v_position;
    if (v.X < e.R) {
      u.X = v.X + this.dimension.width;
      if (!e.side) { this.pom.changeSide(); }
    } else if (this.dimension.width - v.X < e.R) {
      u.X = v.X - this.dimension.width;
      if (e.side) { this.pom.changeSide(); }
    } else {
      u.X = this.dimension.width - v.X;
    }
    if (v.Y < e.R) {
      u.Y = v.Y + this.dimension.height;
    } else if (this.dimension.height - v.Y < e.R) {
      u.Y = v.Y - this.dimension.height;
    } else {
      u.Y = this.dimension.height - v.Y;
    }
  }
  init(side: boolean) {
    console.log('now create circles and draw all...');
    // create objects class with position, size for start
    this.snake.push(new GameObject(new Vector2D(this.dimension.width / 2, this.dimension.height / 2),
                                   new Vector2D(0, 0), 1, 30, side, this._color.generateRandomRbgColor()));
    Game.start();
  }
  move(x: number, y: number, side: boolean) {
    if (this.snake[0].side === side) {
      console.log(x + ' ' + y);
      this.snake[0].v_direction.goto(x, y);
      this.snake[0].v_direction.sub(this.snake[0].v_position);
      this.snake[0].v_direction.normalize();
      console.log(this.snake[0].v_direction.X + ' ' + this.snake[0].v_direction.Y);
    }
  }
  // main method
  run() {
    this.clear('white');
    this.update();
    this.draw();
  }
  // just draw all objects in the game...
  draw() {
    // shadow reflection here
    for (let i = 0; i < this.snake.length; i++) {
      const e = this.snake[i];
      this.drawE(e);
      if (this.isCloseToEdge(e)) {
        this.pom.side = e.side;
        this.pom.R = e.R;
        this.pom.color = e.color;
        this.shadow(e);
        this.drawE(this.pom);
      }
    }
  }
  drawE(e: GameObject) {
    if (e.side) {
      this.ctx_left.beginPath();
      this.ctx_left.fillStyle = e.color;
      this.ctx_left.arc(e.v_position.X, e.v_position.Y, e.R, 0, 2 * Math.PI);
      this.ctx_left.fill();
      this.ctx_left.closePath();
    } else {
      this.ctx_right.beginPath();
      this.ctx_right.fillStyle = e.color;
      this.ctx_right.arc(e.v_position.X, e.v_position.Y, e.R, 0, 2 * Math.PI);
      this.ctx_right.fill();
      this.ctx_right.closePath();
    }
  }
  // prepare new positions... move to reflection position snake head if outside of the map...
  update() {
    for (let i = 0; i < this.snake.length; i++) {
      this.snake[i].move();
      if (this.isOutside(this.snake[i].v_position)) {
        this.reflect(this.snake[i]);
      }
    }
  }
  // clear canvas with color...
  clear(color: string) {
    this.ctx_left.beginPath();
    this.ctx_left.fillStyle = color;
    this.ctx_left.fillRect(0, 0, this.dimension.width, this.dimension.height);
    this.ctx_left.closePath();
    this.ctx_right.beginPath();
    this.ctx_right.fillStyle = color;
    this.ctx_right.fillRect(0, 0, this.dimension.width, this.dimension.height);
    this.ctx_right.closePath();
  }
}
