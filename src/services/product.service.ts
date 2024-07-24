import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product, ProductVariance } from '../app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api: string = environment.api;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }
}