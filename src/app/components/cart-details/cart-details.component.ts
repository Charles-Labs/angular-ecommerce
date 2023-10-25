import { Component } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
  
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  
  constructor(private cartService: CartService) {
    this.listCartDetails();
   }
   
  listCartDetails() {
    // get a handle to the cart items

    // subscribe to the cart totalPrice

    // subscribe to the cart totalQuantity

    // compute cart total price and quantity

    // log cart data just for debugging purposes

    // call the computeCartTotals method

    // subscribe to the events
  }

}
