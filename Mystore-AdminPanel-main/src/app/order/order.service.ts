import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  url = 'http://localhost:7000/order';

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(this.url, this.httpOptions);
  }

  updateOrderStatus(id: number, orderStatus: number) {
    const body = {
      orderStatus,
    };
    return this.http.put(
      this.url + '/update-status/' + id,
      body,
      this.httpOptions
    );
  }

  getOrderPreviewDetails(orderId: number) {
    return this.http.get(this.url + '/details/' + orderId, this.httpOptions);
  }
}
