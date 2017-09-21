
export class Animate {
  
  private static instances = new Array<Animate>();
          static UPDATE: number = 10;
  private static _timer_id: any;

  private _ticks: number;
  private _count: number;
  private _ticks_delay: number;

  constructor(private _e: HTMLElement, private _delay_ms: number, private _repeat_times: number, private _initial_delay_ms: number) {
    this._ticks = this._delay_ms / Animate.UPDATE;
    this._ticks_delay = this._initial_delay_ms / Animate.UPDATE;
    this._count = 0;
    Animate.instances.push(this);
  }
  
  private tick() {
    
    this._ticks_delay--;

    if(this._ticks_delay <= 0) {
      if(this._count >= this._ticks) {
        this._e.style.opacity = (Number(this._e.style.opacity) - 0.1) + "";
        this._repeat_times--;
        if(this._repeat_times <= 0) {
          Animate.instances.splice(Animate.instances.indexOf(this), 1);
        } 
        this._count = 0;
      }
    }

    this._count++;

  }

  private static ontick() {
    if(Animate.instances.length > 0) {
      Animate.instances.forEach(function(e: Animate) {
        e.tick();
      })
    } else {
      Animate.stopAnimations();
    }
  }

  static startAnimations() {
    this._timer_id = setInterval(Animate.ontick, Animate.UPDATE);
  }
  static stopAnimations() {
    clearInterval(this._timer_id);
    Animate.instances.length = 0;
  }
}