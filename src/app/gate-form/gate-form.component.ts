import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, Letter, Color } from './../lib/lib';

@Component({
  selector: 'gate-form',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
  
  @ViewChild("ic") ic;
  
  private _PASSWORD: string;
  private _displayMessage: string;
  private _lastCode: string;
  private _code: string;
  private _color: Color;

  private _false_synonyms: string[] = [	"false", "incorrect", "untrue", "wrong", "erroneous", "fallacious", "faulty", "flawed", "distorted", "inaccurate", "inexact", "imprecise", "invalid", "unfounded", "untruthful", "fictitious", "unreal", "counterfeit", "forged", "fraudulent", "spurious", "misleading", "deceptive" ];
  
  private _message: Letter[];
  private _nextAnimationSide: number;

  constructor() {
    this._message = new Array<Letter>();
    this._PASSWORD = "GaMe TiMe";
    this._lastCode = "";
    this._code = "";
    this._color = new Color();
    this._nextAnimationSide = 0;
  }
  
  ngOnInit() { 
    this.createMessage("message box");
  }

  onEnter() {
    if(this.code === this._PASSWORD) {
      this.createMessage("Connected.");
      this._code = "";
      this._lastCode = "";
    } else if(this.code.length > 0) {
      this.createMessage(this._false_synonyms[Math.floor(Math.random() * this._false_synonyms.length)]);
      this._code = "";
      this._lastCode = "";
    }
  }
  
  onClick(event: MouseEvent) {
    (<HTMLElement>event.target).parentElement.style.setProperty("--color", "rgba"+this.color.generateRandomColor().toString());
    (<HTMLElement>event.target).parentElement.style.setProperty("--color-shadow", "rgba"+this.color.generateRandomColor().toString());
  }

  onMouseMove(event: MouseEvent) {
    let e: HTMLElement = <HTMLElement>this.ic.nativeElement;
    let box = e.getBoundingClientRect(); 
    let x: number;
    let y: number;
    let midx: number = (box.left + box.right) / 2;
    let midy: number = (box.bottom + box.top) / 2;
    let h: number = box.bottom - box.top;
    let w: number = box.right - box.left;

    x = w * (midx - event.x) / midx;
    y = h * (midy - event.y) / midy;
    
    //console.log(event.x + " < x - y > " + event.y + " | O= " + x + " " + y);
    
    e.style.setProperty("--x", ""+x);
    e.style.setProperty("--y", ""+y);
  }

  private createMessage(text: string) {
    if(Animation.isRunning())
      Animation.stopAnimations();
    this._message.length = 0;
    Letter.side = this._nextAnimationSide;
    Letter.lastPosition = text.length - 1;
    this._nextAnimationSide = (this._nextAnimationSide + 1) % 4;
    for(let i = 0; i < text.length; i++) {
      this._message.push(new Letter(text.charAt(i), i));
    }
  }

  get code(): string {
    return this._code;
  }
  set code(code: string) {
    this._code = code;
  }
  get message(): Letter[] {
    return this._message;
  }
  get color(): Color {
    return this._color;
  }
}