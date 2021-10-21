import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product){
    let item = CartItems.find(c=>c.product.product_id===product.product_id);
    if(item){
      item.quantity+=1;
    }else{
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity =1;
      CartItems.push(cartItem)
    }
  }

  list():CartItem[]{
    return CartItems;
  }

  removeFromCart(product:Product){
    let item:CartItem = CartItems.find(c=>c.product.product_id===product.product_id);
    CartItems.splice(CartItems.indexOf(item),1);
  }
}
