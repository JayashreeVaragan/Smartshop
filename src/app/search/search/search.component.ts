import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Product } from 'src/app/product/product';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKey:string;
  productList:string[];
  filteredList:string[];
  product_list:Product[];
filtered_list:Product[];
isAdmin:boolean;
  filterList: Product[];
 

 
  constructor(private productService:ProductServiceService,private authService:AuthServiceService,private router:Router) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
console.log('######################',this.isAdmin)
      this.productService.setIsSearch(false);
    
    this.productService.getAllProductTypes().subscribe(
      data =>{this.productList=data; 
      this.filteredList=data
    console.log(this.filteredList)});

    this.productService.getAllProducts().subscribe(
      data =>{this.product_list=data; 
      this.filtered_list=data
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'+this.filtered_list);});

      this.productService.getAllProducts().subscribe(
        data => {
          this.filterList = data;
        });
      this.router.navigate(['/search-box'])

  }
  search(){
    this.filtered_list=this.product_list.filter(x=>x.productName.toLowerCase().indexOf(this.searchKey.toLowerCase())!=-1);

  }

  delete(code: string) {
    this.productService.deleteProducts(code).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

}
