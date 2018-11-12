import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthServiceService', () => {
  let injector: TestBed;
  let authService: AuthService;
  // tslint:disable-next-line:max-line-length
  let mockJwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImlCakwxUmNxemhpeTRmcHhJeGRacW9oTTJZayIsImtpZCI6ImlCakwxUmNxemhpeTRmcHhJeGRacW9oTTJZayJ9.eyJhdWQiOiJlZDlhMzkwMC05MmE2LTQxYTQtYjdlZC0zMzM0MjMxYjI2YTUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNWQ3NWMwNS1mYTFhLTQyZTctOWNmMS1lYjQxNmMzOTZmMmQvIiwiaWF0IjoxNTI2MjkxNjU3LCJuYmYiOjE1MjYyOTE2NTcsImV4cCI6MTUyNjI5NTU1NywiYWlvIjoiWTJkZ1lOQ3FNTGJaRkJ4MU0yekx0R2ZpNmczNk55TFlmLzkzbVhGS1c4RngvWEdKMk1NQSIsImFtciI6WyJwd2QiXSwiZmFtaWx5X25hbWUiOiJTb25rYXIiLCJnaXZlbl9uYW1lIjoiVml2ZWsiLCJpcGFkZHIiOiIxOTUuODUuMjA0LjE2NSIsIm5hbWUiOiJTb25rYXIsIFZpdmVrIiwibm9uY2UiOiI4NWUzZDM4OC0xOTM1LTQwYWEtODdiYS00MjI3NDYxNzdmZmMiLCJvaWQiOiJjMzEyNDIxYi1mOThkLTRiM2UtODIxOS0wODg2ZDUxZWJkYjQiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTU0NzE2MTY0Mi0xMjE0NDQwMzM5LTY4MjAwMzMzMC0yMTY3OTgyIiwic3ViIjoiOUt0N0ljYlpRSzM0WnA0R2JCNGlNZk40WWpFLVRiUUJ5eWlBN0RwX3h3NCIsInRpZCI6IjA1ZDc1YzA1LWZhMWEtNDJlNy05Y2YxLWViNDE2YzM5NmYyZCIsInVuaXF1ZV9uYW1lIjoidml2ZWsuc29ua2FyQG1hZXJzay5jb20iLCJ1cG4iOiJ2aXZlay5zb25rYXJAbWFlcnNrLmNvbSIsInV0aSI6IjFzNVVCSWNOUVVxNVVIUFRfZEFuQUEiLCJ2ZXIiOiIxLjAifQ.D4tVrbapawWsCyIq_BQPl4aiDazRh55kVLOIsHpOTZFcm9oEpp150b2RGZJw94w7_m-H57L7nws7MqUcDJGyzG2aij6pdH4xo-8VkwDSVB8lkYsqpeSBKauICa--mgESLiA0omqjzole4m2eRZAf7_gekEqM6Hp5LAf6p6Ed7V7miIi8JPkc314szKSoKu7uZeDzg-Xt58ugfr1e2LLF6Cllho4G4lbrDzfvCWeKK952lvlWoDmTyXxt8Ljnc5XeINvx6T5KYLQf7SiI3fyaENjuNzz0Jqrwhsb24ernNbcsg3HBhb8IS-qx4fSrZU_pBoWct5YcOYQs4mlTZYV5ig';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService
      ]
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    sessionStorage.setItem('currentUser', mockJwtToken);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return token', () => {
    expect(authService.getToken()).toEqual(mockJwtToken);
  });

});
