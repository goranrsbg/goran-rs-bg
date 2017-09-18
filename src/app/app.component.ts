import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private _visible: boolean;
  
  constructor() {
    this._visible = true;
  }

  get visible() : boolean {
    return this._visible;
  }
  set visible(val:boolean) {
    this._visible = val;
  }

}
