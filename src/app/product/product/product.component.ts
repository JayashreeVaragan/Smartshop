import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  list: string[];
  productItems: Product[];
  
  constructor(private productService: ProductServiceService) { }

  ngOnInit() {




  }
  products(type: string) {
    this.productService.setIsSearch(true);
    console.log(type);
    this.productService.getProductItems(type).subscribe(data => { this.productItems = data })
  }
}
