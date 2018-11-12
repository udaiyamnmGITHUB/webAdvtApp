import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
 import { ToastrModule } from 'ngx-toastr';
import { AddUserComponent } from './add-user/add-user.component';
import {ListWebsitesComponent} from "./list-websites/list-websites.component";
import {WebsiteManagementService} from "./service/website-management.service";
import { TokenInterceptor } from "./authentication/token-interceptor.service";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/authentication/auth.service";
import { AuthGaurdService } from "src/app/authentication/auth-gaurd.service";
import { ToasterService } from "src/app/service/toaster.service";
import { ExceptionService } from "src/app/service/exception-service";
import { WebsitesDetailComponent } from "src/app/websites-detail/websites-detail.component";

export function init_interceptor(tokenInterceptor: TokenInterceptor){
  return () => {
    tokenInterceptor.skipAuthentication = environment.skipAuthentication;
  }
}

export function init_authentication(authGaurdService: AuthGaurdService) {
  return () => {
    authGaurdService.skipAuthentication = environment.skipAuthentication;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListWebsitesComponent,
    WebsitesDetailComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService, 
    AuthGaurdService,
    TokenInterceptor,
    WebsiteManagementService,
    ExceptionService,
    ToasterService,
    { provide: APP_INITIALIZER, useFactory: init_authentication, deps: [AuthGaurdService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, useFactory: init_interceptor,  multi: true }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
