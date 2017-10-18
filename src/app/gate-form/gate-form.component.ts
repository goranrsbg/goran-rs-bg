import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, Letter, Color } from './../lib/lib';
import { Router } from '@angular/router';
import { VisitorService } from './../services/visitor.service';

@Component({
  templateUrl: './gate-form.component.html',
  styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {

  @ViewChild('inp') inp;
  @ViewChild('cnt') cnt;

  private _displayMessage: string;
  private _code: string;
  private _color: Color;
  private _inputDisabled: boolean;

  private _false_synonyms: string[] = [	'false', 'incorrect', 'untrue', 'wrong', 'erroneous', 'fallacious', 'faulty',
  'flawed', 'distorted', 'inaccurate', 'inexact', 'imprecise', 'invalid', 'unfounded', 'untruthful', 'fictitious',
  'unreal', 'counterfeit', 'forged', 'fraudulent', 'spurious', 'misleading', 'deceptive' ];

  private _message: Letter[];
  private _nextAnimationSide: number;

  constructor(private router: Router, private visitor: VisitorService) {
    this._message = new Array<Letter>();
    this._code = '';
    this._color = new Color();
    this._inputDisabled = false;
    this._nextAnimationSide = 0;
  }

  ngOnInit() {
    this.createMessage('message box');
  }

  onSubmit() {
    if (this.code.length > 0) {
      const e: HTMLElement = <HTMLElement>this.inp.nativeElement;
      this.inputDisabled = true;
      this.createMessage('Verification...');
      this.visitor.logIn(this.code).subscribe(() => {
        if (this.visitor.isValid) {
          this.createMessage('Connected.');
          const url = this.visitor.redirectUrl ? this.visitor.redirectUrl : 'main';
          setTimeout(() => {
            this.router.navigate([url]);
          }, 2000);
        } else {
          this.inputDisabled = false;
          this.createMessage(this._false_synonyms[Math.floor(Math.random() * this._false_synonyms.length)]);
        }
        this._code = '';
      });
      setTimeout(() => {
        e.focus();
      }, 2000);
    }
  }

  onClick() {
    const inp: HTMLElement = <HTMLElement>this.inp.nativeElement;
    const cnt: HTMLElement = <HTMLElement>this.cnt.nativeElement;
    cnt.style.setProperty('--color', 'rgba' + this.color.generateRandomColor().toString());
    inp.style.setProperty('--color-shadow', 'rgba' + this.color.generateRandomColor().toString());
  }

  onMouseMove(event: MouseEvent) {
    const e: HTMLElement = <HTMLElement>this.inp.nativeElement;
    const box = e.getBoundingClientRect();
    let x: number;
    let y: number;
    const midx: number = (box.left + box.right) / 2;
    const midy: number = (box.bottom + box.top) / 2;
    const h: number = box.bottom - box.top;
    const w: number = box.right - box.left;

    x = w * (midx - event.x) / midx;
    y = h * (midy - event.y) / midy;

    e.style.setProperty('--x', '' + x);
    e.style.setProperty('--y', '' + y);
  }

  private createMessage(text: string) {
    if (Animation.isRunning()) {
      Animation.stopAnimations();
    }
    this._message.length = 0;
    Letter.side = this._nextAnimationSide;
    Letter.lastPosition = text.length - 1;
    this._nextAnimationSide = (this._nextAnimationSide + 1) % 4;
    for (let i = 0; i < text.length; i++) {
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
  get inputDisabled(): boolean {
    return this._inputDisabled;
  }
  set inputDisabled(val: boolean) {
    this._inputDisabled = val;
  }
  get color(): Color {
    return this._color;
  }
}
