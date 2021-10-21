import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ResponseModel } from '../models/ResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44376/api/";
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>>{
    let newPath=this.apiUrl+"products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath)
   }

  getProductsByCategory(category_id:number):Observable<ListResponseModel<Product>>{
    let newPath=this.apiUrl+"products/getbycategory?categoryId="+category_id
      return this.httpClient.get<ListResponseModel<Product>>(newPath)
        
      }

  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products/add",product)
  }
}
