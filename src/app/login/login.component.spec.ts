import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('Formulario de Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[RouterTestingModule.withRoutes([]),HttpClientModule,MatCardModule,MatFormFieldModule,MatIconModule,ReactiveFormsModule,MatInputModule,BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('El componente se instanció correctamente.', () => {
    expect(component).toBeTruthy();
  });

  it('El Formulario debe ser invalido.(Si tiene solamente un valor ingresado)', () => {
    fixture.detectChanges();
    const email = component.loginForm.controls['email'];
    email.setValue('qwe@gmail.com');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('El Formulario debe ser valido.(Si tiene ingresada las credenciales)', () => {
    fixture.detectChanges();
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];
    email.setValue('qwe@gmail.com');
    password.setValue('123456');
    expect(component.loginForm.valid).toBeTrue();
  });
  
  it('El usuario se logueo correctamente.', waitForAsync(() => {
    fixture.detectChanges();
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];
    email.setValue('user@demo.com');
    password.setValue('123456');
    const btnElement = fixture.debugElement.query(By.css('#login'));
    btnElement.nativeElement.click();
    const navigateSpy = spyOn(router, 'navigate');
    fixture.whenStable().then(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['home']); 
    });
  }));

});
