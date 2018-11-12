import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "src/app/model/user.model";
import { environment } from '../../environments/environment';
import * as JWT from 'angular2-jwt';
import { map, catchError } from "rxjs/operators";
import { of } from 'rxjs/observable/of';
import { ExceptionService } from "src/app/service/exception-service";
import { Router } from "@angular/router";
import { Injector } from "@angular/core";

const {baseUrl, loginUrl, signUpUrl } = environment;


@Injectable()
export class AuthService {

  constructor(private injector: Injector, private http: HttpClient, private exceptionService: ExceptionService) { }

  public getToken(): string {
    let userInfo:any = sessionStorage.getItem('currentUser');
    userInfo = JSON.parse(userInfo);
    if(userInfo){
      return userInfo.access_token;
    }
    return "";
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return JWT.tokenNotExpired(null, token);
  }

  login(userObj:User) {
    return this.http.post<any>(baseUrl+loginUrl, userObj)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  /**
   * signUp() - Method to call the sign up API to authenticate
   * @param userModelObj
   */
  signUp(userModelObj:User) {
    userModelObj.country_code = userModelObj.country_code ? userModelObj.country_code : "DK"
    return this.http.post(baseUrl + signUpUrl ,userModelObj ).pipe(map(response => response),catchError((error: HttpErrorResponse) =>  this.errorHandler(error)));
    
  }

  // Logout Method
  public logout() {
   this.redirectToLoginPage();
  }

  redirectToLoginPage() {
   sessionStorage.clear();
   let router = this.injector.get(Router);
   router.navigate(['login']);
  }

    /**
   * errorHandler() - Method to handle Error
   * @param error
   */
  errorHandler(error: Response | any) {
    this.exceptionService.processErrors(error);
    return of(error);
  }
}
