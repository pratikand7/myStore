import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  url = 'http://localhost:7000/brand';
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  constructor(private http: HttpClient) {}

  getAllBrands() {
    return this.http.get(this.url, this.httpOptions);
  }

  addBrand(title: string, description: string) {
    const body = {
      title: title,
      description: description,
    };
    return this.http.post(this.url, body, this.httpOptions);
  }

  deleteBrand(id: number) {
    return this.http.delete(this.url + '/' + id, this.httpOptions);
  }

  editBrand(id: number, title: string, description: string) {
    const body = {
      title: title,
      description: description,
    };
    return this.http.put(this.url +"/"+ id, body, this.httpOptions);
  }
}
