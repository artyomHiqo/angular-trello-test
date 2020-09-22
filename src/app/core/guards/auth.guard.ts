import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@app-services/auth.service';
import { Observable } from 'rxjs';
import { isUndefined } from 'lodash';
import { filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthorized()
    .pipe(
      filter((isAuth) => {
        return !isUndefined(isAuth);
      }),
      map((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login'])
        }
        return isAuth;
      })
    );
  }
}
