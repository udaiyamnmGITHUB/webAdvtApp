import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor {

  skipAuthentication: boolean = false;
  constructor( public auth: AuthService) { }

  /**
  * UI will still keep sending Authorization token to access other API Urls. It skips only when skip authentication is true
  */
  intercept(request: HttpRequest<any>, next: any): Observable<HttpEvent<any>> {
    let skipAuthorization = request.headers.has('InterceptorSkipHeader');
    if (this.skipAuthentication){
      skipAuthorization = this.skipAuthentication;
    }
    if (!skipAuthorization) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(request);
    }
    else{
     const headers = request.headers.delete('InterceptorSkip  Header');
      return next.handle(request.clone({ headers }));
    }

    
  }

}
