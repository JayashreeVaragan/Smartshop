import { Component, OnInit } from '@angular/core';

import { Product } from '../Product';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  proList:Product[]
  filteredlist:Product[]
  searchKey:string
  userList:Product[]
  total:number=0;
  contact: string;

  constructor(private productService:ProductServiceService) { }

  ngOnInit() {
    this.userList=[]
    this.productService.getAllProducts().subscribe(
      data =>{ this.proList=data;
        this.filteredlist = data;
        console.log(this.filteredlist);
        console.log(this.proList);
        console.log(data);
      });
  }
  newSearch() {
    
    this.filteredlist = this.proList.filter(l => (l.productName.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase())!=-1)||(l.productCode.indexOf(this.searchKey.toLocaleLowerCase())!=-1));
   }
   list(product:Product){
     let added: boolean= false;
     console.log(product)
     product.quantity=1;
     this.userList.forEach(element => {
      if(element.productCode.match( product.productCode)){
        added=true;
      }  
     });
if (!added) {
  this.userList.push(product);     
  this.total= this.total + (+product.rate);
}
     
   }
   remove(product:Product) {
     if(product.quantity<=1){
       let index = this.userList.indexOf(product);
        this.userList.splice(index,1);
     }
    if(product.quantity > 0) {
      product.quantity--;
      this.total= this.total - (+product.rate); 
    }

  }

  add(product:Product) {
    product.quantity++;
    this.total= this.total + (+product.rate); 
  }
  onSaveClick(){
    //let billList:bill={billDate:this.contactForm.value["editDate"],userid:this.contactForm.value["editName"],
    // this.productService.postBill(billList).subscribe(
    //   data=>{}
   // )
   console.log(this.userList)
   console.log(this.contact)
   this.userList.forEach(element => {
     this.productService.postBill(this.contact,element.productCode,element.quantity).subscribe(
       data=>{
         console.log(data)
       }
     )
    })
     alert("Billed Successfully");
  }

  
}

