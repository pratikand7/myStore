import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  url = 'http://localhost:7100/product';

  constructor(private http: HttpClient) {}

  getProductInfo(id: number) {
    return this.http.get(this.url + '/' + id, this.httpOptions);
  }

  filterProducts(categoryId: number, brandId: number) {
    const body = {
      categoryId: categoryId,
      brandId: brandId,
    };
    return this.http.post(this.url + '/filter', body, this.httpOptions);
  }
}
