import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  // Handle API errors
  handleError() {
    return throwError('Something went wrong. Please try again.');
  };

  getProducts() {
    return this.http.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush').pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getProductDetails(id: number) {
    return this.http.get(`http://makeup-api.herokuapp.com/api/v1/products/${id}.json`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
