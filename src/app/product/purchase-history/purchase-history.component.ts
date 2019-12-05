import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import { PurchaseHistory } from '../purchase-history';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  adminList: PurchaseHistory[];
  dateKey:Date;
  dateList: PurchaseHistory[];

  constructor(private productService: ProductServiceService, private userService: UserServiceService) { }

  ngOnInit() {
    this.productService.getBill(this.userService.userId).subscribe(
      data => {
        this.adminList = data;
        this.dateList=data;
      });
  }
 searchDate(){
  if(this.dateKey.toLocaleString().length==0){
     this.dateList=this.adminList;
   }
   else{
    this.dateList=this.adminList.filter(n =>this.dateKey.toLocaleString().match(n.billDate.toLocaleString()));
     console.log(this.dateList);
   }
 }
}
