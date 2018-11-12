import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {User} from "../model/user.model";
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { ToasterService } from "src/app/service/toaster.service";
import { ExceptionService } from "src/app/service/exception-service";
import { Website } from "src/app/model/website.model";

const {baseUrl, addWebsiteUrl, updateWebsiteUrl } = environment;
@Injectable()
export class WebsiteManagementService {
  
  localStorageWebsiteList : Website[] = [];
  constructor(private http: HttpClient, private toasterService:ToasterService, private exceptionService: ExceptionService) { }
 
  /**
   * createWebsite() - Method to call the createWebsite API
   * @param userModelObj
   */
  createWebsite(WebsiteModelObj:Website) {
    return this.http.post(baseUrl + addWebsiteUrl ,WebsiteModelObj ).pipe(map(response => response),catchError((error: HttpErrorResponse) =>  this.errorHandler(error)));
    
  }

   /**
   * updateWebsite() - Method to call the updateWebsite API
   * @param userModelObj
   */
  updateWebsite(WebsiteModelObj:Website) {
    return this.http.patch(baseUrl + updateWebsiteUrl + WebsiteModelObj.id ,WebsiteModelObj ).pipe(map(response => response),catchError((error: HttpErrorResponse) =>  this.errorHandler(error)));
    
  }
  

   /**
   * storeWebsitesList() - Method to store the website when API is down
   * @param userModelObj
   */
  updateWebsiteList(WebsiteModelObj:Website) {
    this.localStorageWebsiteList.forEach(item => {
      if(item.id == WebsiteModelObj.id){
        item.name = WebsiteModelObj.name;
        item.website = WebsiteModelObj.website;
      }
    });
  }

    /**
   * storeWebsitesList() - Method to store the website when API is down
   * @param userModelObj
   */
  deleteWebsiteFromList(WebsiteModelObj:Website) {
    this.localStorageWebsiteList.forEach((item, index) => {
      if(item.id == WebsiteModelObj.id){
        this.localStorageWebsiteList.splice(index, 1);
      }
    });
    
  }

  /**
   * storeWebsitesList() - Method to store the website when API is down
   * @param userModelObj
   */
  storeWebsitesList(WebsiteModelObj:Website) {
    this.localStorageWebsiteList.push(WebsiteModelObj);
  }

  /**
   * getWebsitesListFromLocalStorage() - Method to retrieve the website when API is down
   * @param userModelObj
   */
  getWebsitesListFromLocalStorage():Website[] {
    return this.localStorageWebsiteList;
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
