import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FoodStoreComponent } from '../food-store/food-store.component';
import {SessionStorage} from '../classes/SessionStorage';

@Injectable()
export class StoreFirstGuard
{
  private firstNavigation = true;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    const sessionStorage = localStorage.getItem('token');
    console.log('aki');
    console.log(sessionStorage);
    if (sessionStorage == null) {
      this.router.navigateByUrl('/login');
      return false;
    }
    console.log('true');
    return true;
    /*if (sessionStorage) {
      console.log('aki');
      console.log(sessionStorage);
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { callback: state.url }});
      return false;
    }*/
  }
   /* if (this.firstNavigation)
    {
      console.log('this first navigation');
      console.log(route);
      this.firstNavigation = false;
      if (route.component !== foodStoreComponent)
      {
        this.router.navigateByUrl('/food-list');
        return false;
      }
    }
    return true;*/
}

