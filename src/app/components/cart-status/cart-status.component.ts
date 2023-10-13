import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {
  
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

}
