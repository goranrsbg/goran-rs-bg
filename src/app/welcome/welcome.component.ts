import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private _message: string;

  constructor() { }

  ngOnInit() {
    this._message = 'W E L C O M E';
  }

  get message(): string {
    return this._message;
  }
}
