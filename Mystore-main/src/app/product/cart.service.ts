import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  url = 'http://localhost:7100/cart';

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  getCartItems() {
    return this.http.get(this.url, this.httpOptions);
  }

  addToCart(productId: number, price: number, quantity: number) {
    const body = {
      productId: productId,
      price: price,
      quantity: quantity,
    };
    return this.http.post(this.url, body, this.httpOptions);
  }

  updateQuantity(cartId: number, quantity: number) {
    const body = {
      quantity: quantity,
    };
    return this.http.put(this.url + '/' + cartId, body, this.httpOptions);
  }

  deleteCartItem(cartId: number) {
    return this.http.delete(this.url + '/' + cartId, this.httpOptions);
  }
}
