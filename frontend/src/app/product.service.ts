import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductResponse } from './product-response.model';
import { ProductData } from './product-data.model';
// import { ApiResponse } from './api-response.model';
const apiUrl = 'http://localhost:3000/products';

interface ApiResponse {
  status: number;
  data: ProductData[];
}

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(apiUrl);
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<ProductResponse> {
    const url = `${apiUrl}/create`;
    return this.http.post<ProductResponse>(url, product);
  }

  updateProduct(productId: number, product: Product): Observable<ProductResponse> {
    const url = `${apiUrl}/update/${productId}`;
    return this.http.put<ProductResponse>(url, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/delete/${id}`);
  }

  restoreProduct(id: number): Observable<void> {
    return this.http.put<void>(`${apiUrl}/restore/${id}`, null);
  }
}
