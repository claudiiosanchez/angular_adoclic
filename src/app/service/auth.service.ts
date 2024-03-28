import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { 
  }

  apiurl='http://localhost:3000/user';

  GetUserbyCode(email:any){
    return this.http.get<any>(this.apiurl+'/'+email);
  }

  isloggedin(){
    return sessionStorage.getItem('email')!=null;
  }
  
}
