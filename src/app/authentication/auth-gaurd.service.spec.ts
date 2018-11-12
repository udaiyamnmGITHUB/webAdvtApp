import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGaurdService } from './auth-gaurd.service';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('AuthGaurdService', () => {
  let injector: TestBed;
  let authGauard: AuthGaurdService;
  let httpMock: HttpTestingController;
  let canActivateInit: CanActivate;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthGaurdService
      ]
    });
    injector = getTestBed();
    authGauard = injector.get(AuthGaurdService);
    router = injector.get(Router);
    httpMock = injector.get(HttpTestingController);
  });

 /* it('should be created', () => {
    expect(authGauard).toBeTruthy();
    const mockRequest = httpMock.expectOne('https://login.microsoftonline.com/05d75c05-fa1a-42e7-9cf1-eb416c396f2d/oauth2/authorize?response_type=id_token&client_id=ed9a3900-92a6-41a4-b7ed-3334231b26a5&redirect_uri=http%3A%2F%2Flocalhost%3A9876%2Fcontext.html&state=400a3dfe-0e84-4f6f-bf6b-0320a60cb334&client-request-id=9fe8d896-ba0d-4858-a4de-226cce3b722b&x-client-SKU=Js&x-client-Ver=1.0.16&nonce=017d767b-82aa-4b7b-9615-ec435587be5d&iframe-request-id=4f80b5e8-7071-4988-b69a-b02856260800');
    mockRequest.flush({});
  });

  it('should have permission to the route', () => {
    spyOn(router, 'navigate');
    authService.userInfo.authenticated = true;
    expect(authGauard.canActivate()).toBeTruthy();
  });*/
});
