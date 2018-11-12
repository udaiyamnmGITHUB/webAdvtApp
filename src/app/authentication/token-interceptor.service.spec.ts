import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { TokenInterceptor } from './token-interceptor.service';
import { environment } from '../../environments/environment';

const { baseUrl } = environment;


@Injectable()
export class DummyHttpRequest {

  constructor(private http: HttpClient) {}
  dummyRequest() {
    return this.http.get(baseUrl);
  }
}

describe('TokenInterceptor', () => {
  let injector: TestBed;
  let tokenInterceptor: TokenInterceptor;
  let authService: AuthService;
  let dummyHttpRequest: DummyHttpRequest;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TokenInterceptor,
        AuthService,
        DummyHttpRequest,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });
    injector = getTestBed();
    tokenInterceptor = injector.get(TokenInterceptor);
    authService = injector.get(AuthService);
    dummyHttpRequest = injector.get(DummyHttpRequest);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(tokenInterceptor).toBeTruthy();
  });

  it('should be able to append autorization headers', () => {
    expect(tokenInterceptor).toBeTruthy();
    dummyHttpRequest.dummyRequest().subscribe();

    const mockRequest = httpMock.expectOne(baseUrl);
    expect(mockRequest.request.method).toBe('GET');
    expect(mockRequest.request.headers.has('Authorization'));
  });
});


