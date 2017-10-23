import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from '../services/color.service';
import { SnakeGameService } from './../services/snake-game.service';

@Component({
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @ViewChild('hdr') hdr;

  constructor(private _color: Color, private game: SnakeGameService) { }

  ngOnInit() { }

  onClick() {
    const hdr: HTMLElement = <HTMLElement>this.hdr.nativeElement;
    hdr.style.setProperty('--color', this._color.generateRandomRbgColor());
  }
}
