import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.gateform',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {

  private _PASSWORD: string = "GaMeTiMe";
  private lastCode: string;
  private _code: string;
  private _result: string;
  private mBox: HTMLElement;

  constructor() {
    this.lastCode = "";
    this._code = "";
    this._result = "message";
  }

  ngOnInit() {
    this.mBox = document.getElementById("message");
    this.mBox.style.visibility = "hidden";
  }

  onEnter() {
    if(this._code == this._PASSWORD) {
      this._result = this._code;
    } else {
      if(!running) {
        this._result = "F A L S E";
        this.mBox.style.visibility = "visible";
        animateOpacity(this.mBox);
        this._code = "";
        this.lastCode = "";
      }
    }
  }

  onAnyKey() {
    if(this._code.length > this.lastCode.length) {
      console.log("chech new key: " + this._code.charAt(this._code.length - 1));
      this.lastCode = this._code;
    } else if(this._code.length < this.lastCode.length) {
      this.lastCode = this._code;
    }
  }

  get code(): string {
    return this._code;
  }
  set code(code: string) {
    this._code = code;
  }
  get result(): string {
    return this._result;
  }
  set result(result: string) {
    this._result = result;
  }
}

let running: boolean = false;

function animateOpacity(e: HTMLElement) {
  let opc: number = 2;
  running = true;
  anim();
  function anim() {
    if(opc < 0) {
      e.style.visibility = "hidden";
      e.style.opacity = "1.0";
      running = false;
    } else {
      opc = opc - 0.1;
      if(opc < 1)
        e.style.opacity = opc + "";
      setTimeout(anim, 100);
    }
  }
}