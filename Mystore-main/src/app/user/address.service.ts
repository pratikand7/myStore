import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  url = 'http://localhost:7100/address';

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  getAllAddresses() {
    return this.http.get(this.url, this.httpOptions);
  }

  addAddress(
    title: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    pinCode: number
  ) {
    const body = {
      title: title,
      line1: line1,
      line2: line2,
      city: city,
      state: state,
      pinCode: pinCode,
    };

    return this.http.post(this.url, body, this.httpOptions);
  }

  editAddress(
    id: number,
    title: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    pinCode: string
  ) {
    const body = {
      line1: line1,
      line2: line2,
      city: city,
      state: state,
      pinCode: pinCode,
      title: title,
    };

    return this.http.put(this.url + '/' + id, body, this.httpOptions);
  }

  deleteAddress(id: number) {
    return this.http.delete(this.url + '/' + id, this.httpOptions);
  }
}
