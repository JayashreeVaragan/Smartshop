import { Component, OnInit, Input } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Product } from '../product';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  public isAdmin: boolean = false;
  @Input() public type: Product[];
  filteredList: Product[];
  constructor(private productService: ProductServiceService, private authservice: AuthServiceService, public router: Router) { }

  ngOnInit() {
    console.log(this.type);
    this.isAdmin = this.authservice.isAdmin;
    this.productService.getAllProducts().subscribe(
      data => {
        this.filteredList = data;
      });
    this.router.navigate(['/search-box'])
  }
  delete(code: string) {
    this.productService.deleteProducts(code).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

}
