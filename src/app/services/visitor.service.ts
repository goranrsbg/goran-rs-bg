import { Data } from './../lib/lib';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class VisitorService {

  private _isValid: boolean;
  private _redirectUrl: string;
  private _url: string;

  constructor(private http: HttpClient) {
    this._isValid = false;
    this._url = 'http://skynet-goranrsbg.1d35.starter-us-east-1.openshiftapps.com/eebackend/validate/code';
  }

  logIn(code: string): Observable<boolean> {
    let answer: Data = {name: 'none', askAndLearn: 'none'};
    this.http.post<Data>(this._url, code).subscribe(v => {
      answer = v;
    }, (err: HttpErrorResponse) => {
      if (err instanceof Error) {
        console.log('An error occurred: ', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return Observable.of(this._isValid).delay(2000).do(val => this._isValid = false);
    });
    return Observable.of(this._isValid).delay(2000).do(val => this._isValid = (answer.name === 'Skynet' &&
    answer.askAndLearn === 'keyIsValid'));
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
