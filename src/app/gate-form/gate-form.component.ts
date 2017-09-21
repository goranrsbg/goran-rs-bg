import { Component, OnInit } from '@angular/core';
import { Animate } from './../lib/lib';

@Component({
  selector: '.gateform',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {

  private _PASSWORD: string = "GaMeTiMe";
  private _lastCode: string;
  private _code: string;
  private _result: string;
  private _mBox: HTMLElement;

  constructor() {
    this._lastCode = "";
    this._code = "";
    this._result = "message box";
  }

  ngOnInit() {
    this._mBox = document.getElementById("messageBox");
  }

  onEnter() {
    if(this._code == this._PASSWORD) {
      this._result = this._code;
    } else {
      this._result = "F A L S E";
      new Animate(this._mBox, 100, 10, 0);
      Animate.startAnimations();
      this._code = "";
      this._lastCode = "";
    }
  }

  onAnyKey() {
    if(this._code.length > this._lastCode.length) {
      // TODO check new characters
      this._lastCode = this._code;
    } else if(this._code.length < this._lastCode.length) {
      // stay cool on deletion
      this._lastCode = this._code;
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