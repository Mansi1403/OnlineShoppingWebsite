import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Modules/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8090/product-api'

  // Add Product

  addProduct(product:Product){
    return this.http.post(this.baseUrl + '/add-product',product)
  }

  // getRetailerById(retailerId:number){
  //   return this.http.get<{}>(this.baseUrl + '/get-retailer-byId/' + retailerId);
  // }
}
