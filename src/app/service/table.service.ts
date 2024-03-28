import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  private baseURL = 'https://fakestoreapi.com/products';
  private categories = 'https://fakestoreapi.com/products/categories';
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.baseURL);
  }
  /*
  getAllCategories():Observable<string[]> {
    return this.http.get<string[]>(this.categories);
  }*/
  getAllCategories() {
    return this.http.get(this.categories).pipe(
      map((data: any) => {
        return data.concat('all');
      })
    );;
  }
  
}
