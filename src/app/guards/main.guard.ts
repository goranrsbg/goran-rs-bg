import { VisitorService } from './../services/visitor.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainGuard implements CanActivate, CanLoad {

  constructor(private visitor: VisitorService, private router: Router) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    const url = '/${route.path}';
    return this.chechLogin(url);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;

    // console.log('AuthGuard#canActivate called ' + this.visitor.isValid);

    return this.chechLogin(url);
  }

  chechLogin(url: string): boolean {
    if (this.visitor.isValid) {
      return true;
    } else {
      this.visitor.redirectUrl = url;
      this.router.navigate(['/typeKeyAndEnter']);
    }
    return false;
  }
}
