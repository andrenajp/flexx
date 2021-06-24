import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../login/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ChatGuardGuard implements CanActivate {

  constructor(private auth: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (!this.auth.isAuthenticated()) 
      return false;

    return true;
  }
  
}
