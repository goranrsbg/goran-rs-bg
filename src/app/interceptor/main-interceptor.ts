import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class KeyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cpyreq = req.clone({headers: req.headers.set('authorization', 'r2-d2aNdC-3pO'),
                                  url:     req.url.replace('eebackend', 'skynet')});

        return next.handle(cpyreq);
    }
}
