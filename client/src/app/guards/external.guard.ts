import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionStorage} from '../classes/SessionStorage';

@Injectable({providedIn: 'root'})
export class ExternalGuard implements CanActivate {


  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const sessionStorage: SessionStorage = JSON.parse(localStorage.getItem('session'));
    if (sessionStorage) {
      this.router.navigate(['/store/food-list']);
      return false;
    }
    return true;
  }

}
