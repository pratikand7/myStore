import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:7000/category';
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(this.url, this.httpOptions);
  }

  addCategory(title: string, description: string) {
    const body = {
      title: title,
      description: description,
    };
    return this.http.post(this.url, body, this.httpOptions);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }

  editCategory(id: number, title: string, description: string) {
    const body = {
      title: title,
      description: description,
    };
    return this.http.put(this.url +"/"+ id, body, this.httpOptions);
  }
}
