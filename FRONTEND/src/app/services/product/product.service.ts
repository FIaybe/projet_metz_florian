import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private client: HttpClient) { }

  //GetProduct : return a list of products
  getProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(environment.apiUrl + '/product', this.httpOptions);
  }

  getProduct(id: number): Observable<Product> {
    return this.client.get<Product>(environment.apiUrl + '/product/' + id, this.httpOptions);
  }

  getProductFromTerm(term: string): Observable<Product[]> {
    return this.client.get<Product[]>(environment.apiUrl + '/product/term/' + term, this.httpOptions);
  }

  postProduct(product: Product): Observable<Product> {
    return this.client.post<Product>(environment.apiUrl + '/product', product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.client.delete<Product>(environment.apiUrl + '/product/' + id, this.httpOptions);
  }
}
