import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class VisitorService {
  
  private PASSWORD: string = "admin";
  private _isValid: boolean;
  private _redirectUrl: string;
  
  constructor() { 
    this._isValid = false;
  }
  
  logIn(code: string): Observable<boolean> {
    return Observable.of(this.PASSWORD === code).delay(2000).do(val => this._isValid = this.PASSWORD === code);
  }

  logOut() {
    this._isValid = false;
  }

  set redirectUrl(redirectUrl: string) {
    this._redirectUrl = redirectUrl;
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  get isValid(): boolean {
    return this._isValid;
  }

}
