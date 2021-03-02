import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor( private authService: AuthService,
                private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if(this.authService.auth.id) {
    //     return true;
    //   }
    //   console.log('bloqueado por CanActivate');
    // return false;
    return this.authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      // if(this.authService.auth.id) {
      //   return true;
      // }
      // console.log('bloqueado por CanLoad');

      // return false;
      return this.authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigate(['/auth/login']);
          }
        })
      );
    }
}
