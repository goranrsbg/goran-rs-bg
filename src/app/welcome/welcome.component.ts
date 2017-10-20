import { Component, OnInit } from '@angular/core';
import { Color } from '../services/color.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private _message: string;

  constructor(private _color: Color) {
    this._message = 'WELCOME';
   }

  ngOnInit() { }

  onOver(event: any) {
    (<HTMLElement>event.target).style.setProperty('--angle', '' + Math.random() * 360);
    (<HTMLElement>event.target).style.color = this._color.generateRandomRbgColor();
  }

  get message(): string {
    return this._message;
  }

}
