import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
	product!: Product;

	constructor(private productService: ProductService,
				private cartService: CartService,
				private route: ActivatedRoute) {}

	ngOnInit(): void{
		this.route.paramMap.subscribe(() => {
			this.handleProductDetails();
		})
	}
	
	handleProductDetails() {
		const theProductId = +this.route.snapshot.paramMap.get("id")!;

		this.productService.getProduct(theProductId).subscribe(
			data => {
				console.log("Product" + JSON.stringify(data));
				this.product = data;
			}
		)
	}

	addToCart() {

	}

}
