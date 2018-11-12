import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from "src/app/authentication/auth.service";

@Injectable()
export class AuthGaurdService implements CanActivate {


  skipAuthentication: boolean = false;
  constructor( private authService: AuthService ) { }

  /**
   * canActivate() - Method which intercepts every route
   * to check if the user has permmission to view the page
   */
  canActivate() {

    if (!this.skipAuthentication) {
     // Check if the user is authenticated. If not, call the login() method
      if (!this.authService.isAuthenticated()) {
        this.authService.redirectToLoginPage();
      }
    }
    
    return true;
  }

}
