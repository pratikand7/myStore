import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:7000/user';

  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.url, this.httpOptions);
  }

  changeStatus(id: number, status: number) {
    const body = {
      status: status,
    };
    return this.http.put(
      this.url + '/change-status/' + id,
      body,
      this.httpOptions
    );
  }
}
