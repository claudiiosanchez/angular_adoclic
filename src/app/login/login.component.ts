import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;
  loginForm: FormGroup = new FormGroup([]);
  hide: boolean = false;
  
  constructor(private fb: FormBuilder,private router: Router, private authservice: AuthService) {
    sessionStorage.clear();
  }

  ngOnInit():void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  sendLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authservice.GetUserbyCode(this.loginForm.value.email).subscribe({
        next: (data) => {
          this.result = data;
          if (this.result.password === this.loginForm.value.password) {
            resolve(data);
          } else {
            const error409 = [{
              error: "Invalid user",
              status: 409, statusText: 'Not Found'
            }];
            reject(error409);
          }
        }, error: (err) => {reject(err);}
      });
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.sendLogin().then((data) => {
        sessionStorage.setItem('email',this.result.id);
        this.router.navigate(['home']);
      }).catch(e =>{console.log(e);alert('Invalid credentials');});
      /*
      this.authservice.GetUserbyCode(this.loginForm.value.email).subscribe({
        next: (data) => {
          this.result = data;
          if (this.result.password === this.loginForm.value.password) {
            sessionStorage.setItem('email',this.result.id);
            this.router.navigate(['home']);
          } else {
            alert('Invalid credentials');
          }
        }, error: (err) => {alert('Invalid credentials');}
      });*/
    }
  }

}