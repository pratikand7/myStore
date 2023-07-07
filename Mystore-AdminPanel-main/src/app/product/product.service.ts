import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:7000/product';
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.url, this.httpOptions);
  }

  addProduct(
    title: string,
    description: string,
    price: string,
    categoryId: number,
    brandId: number,
    image: any
  ) {
    const body = new FormData();
    body.append('title', title);
    body.append('description', description);
    body.append('price', price);
    body.append('categoryId', '' + categoryId);
    body.append('brandId', '' + brandId);
    body.append('image', image);
    return this.http.post(this.url, body, this.httpOptions);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.url + '/' + id, this.httpOptions);
  }

  editProduct(
    id: number,
    title: string,
    description: string,
    price: string,
    categoryId: number,
    brandId: number,
    image: any
  ) {
    const body = new FormData();
    body.append('title', title);
    body.append('description', description);
    body.append('price', price);
    body.append('categoryId', '' + categoryId);
    body.append('brandId', '' + brandId);
    body.append('image', image);
    return this.http.put(this.url + '/' + id, body, this.httpOptions);
  }
}
