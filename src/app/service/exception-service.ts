import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ToasterService } from "src/app/service/toaster.service";

@Injectable()
export class ExceptionService {
  
  constructor(private http: HttpClient, private toasterService:ToasterService) { }
 

   /**
   * processErrors() - Method to handle error caught during Service call
   * @param error
   */
  processErrors(errorResponse: Response | any) {
    if ( errorResponse instanceof HttpErrorResponse ) {
      switch (errorResponse.status) {
        case 0:
          this.connectionError(errorResponse);
          break;
        case 400:
          this.connectionError(errorResponse);
          break;
        case 401:
          this.connectionError('');
          break;
        case 403:
          this.connectionError(errorResponse);
          break;
        case 404:
          this.connectionError(errorResponse);
          break;
        case 409:
          this.connectionError(errorResponse);
          break;
        case 500:
          this.connectionError(errorResponse);
          break;
        default:
          this.connectionError(errorResponse);
      }
    }
  }

  connectionError(errorResponse){
   console.log("API ERROR"+errorResponse);
  }
}
