import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.gateform',
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
  
  private _text: string;
  private _PASSWORD: string = "GaMeTiMe";
  private _code: string;
  private _result: string;
  
  constructor() {
    this._text = "This is string from GateFormComponent class.";
    this._code = "";
    this._result = "";
  }

  ngOnInit() {
  }

  onEnter() {
      if(this._code == this._PASSWORD) {
        this._result = this._code;
      } else {
        this._result = "F A L S E";
        this._code = "";
      }
  }

  get code(): string {
    return this._code;
  }

  set code(text: string) {
    this._code = text;
  }

  get text(): string {
    return this._text;
  }

  set text(text: string) {
    this._text = text;
  }

  get result(): string {
    return this._result;
  }

  set result(text: string) {
    this._result = text;
  }
  get PASSWORD(): string {
    return this._PASSWORD;
  }

}
