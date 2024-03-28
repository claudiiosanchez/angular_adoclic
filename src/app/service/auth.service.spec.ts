import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Respuesta mockeada al loguearse un usuario correcto.', () => {
    const mockUserData = {
      email: 'user@demo.com',
      password: '123456',
      id: 'user@demo.com'
    };

    const email = 'user@demo.com';
    service.GetUserbyCode(email).subscribe(userData => {
      expect(userData).toEqual(mockUserData);
    });
    
    const req = httpMock.expectOne(service.apiurl+"/"+email);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('Error 404 al intentar loguearse un usuario incorrecto.', () => {
    const email = 'nonexistent@demo.com';
    const errorMessage = 'Not Found';
    const status = 404;

    service.GetUserbyCode(email).subscribe(
      () => {},
      error => {
        expect(error.status).toBe(status);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(service.apiurl+"/"+email);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status, statusText: 'Not Found' });
  });
});