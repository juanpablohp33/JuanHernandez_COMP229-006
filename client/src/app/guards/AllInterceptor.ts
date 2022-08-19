import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SessionStorage} from "../classes/SessionStorage";

@Injectable()
export class AllInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const sessionStorage: SessionStorage = JSON.parse(localStorage.getItem('session'));
    const idToken = (sessionStorage === undefined || sessionStorage === null) ? null : sessionStorage.source;

    if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    });
    return next.handle(cloned);
  } else {
      // this.router.navigate(['/login']);
      return next.handle(req);
}
}

}
