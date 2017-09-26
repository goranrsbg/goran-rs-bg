
export class Animation {
  
  private static instances = new Array<Animation>();
          static UPDATE: number = 10;
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
    if(Animation._timer_id === false) {
      Animation.startAnimations();
    }
  }

  private tick() {
    
    this._ticks_delay--;

    if(this._ticks_delay <= 0) {
      if(this._count >= this._ticks) {
        this._e.style.opacity = (Number(this._e.style.opacity) - 0.1) + "";
        this._repeat_times--;
        if(this._repeat_times <= 0) {
          Animation.instances.splice(Animation.instances.indexOf(this), 1);
        } 
        this._count = 0;
      }
    }

    this._count++;

  }

  private static ontick() {
    if(Animation.instances.length > 0) {
      Animation.instances.forEach(function(e: Animation) {
        e.tick();
      })
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
}

export class Letter {
  
  static side: number;
  static lastPosition: number;
  
  constructor(private _sign: string, private _postion: number){}
  
  get sign(): string {
      return this._sign;
  }
  
  get position(): number {
      return this._postion;
  }
}