
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

  // tslint:disable-next-line:member-ordering
  private static ontick() {
    if (Animation.instances.length > 0) {
      Animation.instances.forEach(function(e: Animation) {
        e.tick();
      });
    } else {
      Animation.stopAnimations();
    }
  }

  // tslint:disable-next-line:member-ordering
  static startAnimations() {
    Animation._timer_id = setInterval(Animation.ontick, Animation.UPDATE);
  }
  // tslint:disable-next-line:member-ordering
  static stopAnimations() {
    clearInterval(Animation._timer_id);
    Animation.instances.length = 0;
    Animation._timer_id = false;
  }
  // tslint:disable-next-line:member-ordering
  static isRunning(): boolean {
    return Animation._timer_id !== false;
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
  public static r: number;
  constructor(public pos: Vector2D, private left: boolean) {}
  isLeft() {
    return this.left;
  }
  changeSide() {
    this.left = !this.left;
  }
}

export class Vector2D {
  private x: number;
  private y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = -y;
  }
  get X(): number {
    return this.x;
  }
  get Y(): number {
    return -this.y;
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
  scale(n: number) {
    this.x *= n;
    this.y *= n;
  }
  normalize() {
    this.scale(1 / this.mag());
  }
  limit(n: number) {
    if (this.mag() > n) {
      this.scale(n / this.mag());
    }
  }
  moveTo(x: number, y: number) {
    this.x = x;
    this.y = -y;
  }
}
