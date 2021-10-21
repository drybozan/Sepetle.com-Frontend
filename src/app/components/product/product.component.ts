import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';

import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  dataLoaded=false;
  filterText="";

  p: number = 1;
  count: number = 7;


  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute, private toastrService:ToastrService,
    private cartService:CartService) { } //product.component product servisi kullanabilir demek

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["category_id"]){
      this.getProductsByCategory(params["category_id"])
      }else{
        this.getProducts()
      }
    })
  }

 getProducts(){
   this.productService.getProducts().subscribe(response=>{
     this.products=response.data
     this.dataLoaded=true;
   })
 }

 getProductsByCategory(category_id:number){
  this.productService.getProductsByCategory(category_id).subscribe(response=>{
    this.products=response.data
    this.dataLoaded=true;
 })
}
addToCart(product:Product){
  this.toastrService.success("Sepete eklendi", product.product_name);
  this.cartService.addToCart(product);
}
}
