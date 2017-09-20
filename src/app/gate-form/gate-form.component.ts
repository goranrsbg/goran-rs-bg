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
          this.mBox.style.visibility = "visible";
          console.log("HERE");
          this._result = "F A L S E";
          animateOpacity(this.mBox);
          this._code = "";
          this.lastCode = "";
        }
      }
  }

  onKey() {
    if(this._code.length > this.lastCode.length) {
      
      this.lastCode = this._code;
    } else if(this._code.length < this.lastCode.length) {
      this.lastCode = this._code;
    }
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