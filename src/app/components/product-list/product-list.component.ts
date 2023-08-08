import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })
  }
  
  listProducts() {
    //Check if "id" parameter is available
	const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

	if (hasCategoryId){
		//get the "id" param string. Convert string to a number  using the "+" operator
	}

    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
