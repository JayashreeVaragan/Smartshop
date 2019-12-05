import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product/product';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { PurchaseHistory } from '../product/purchase-history';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  isSearch:boolean;
  setIsSearch(isSearch:boolean){
    this.isSearch = isSearch;

  }
  getIsSearch():boolean{
 return this.isSearch;
  }
  constructor(private httpClient:HttpClient,private authservice:AuthServiceService) { }
  getAllProductTypes():Observable<string[]>{
    let headers=new HttpHeaders();
 headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
     return this.httpClient.get<string[]>('http://localhost:8087/smart-shop-service/search-box/types',{headers});
}
getProductItems(name:string):Observable<Product[]>{
let headers=new HttpHeaders();
headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
    return this.httpClient.get<Product[]>('http://localhost:8087/smart-shop-service/search-box/'+name,{headers});
}
 modifyProducts(product:Product):Observable<Product>
 {
  let headers=new HttpHeaders();
  headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
      return this.httpClient.put<Product>('http://localhost:8087/smart-shop-service/search-box/',product,{headers}); 
     }
    getProducts(code:string):Observable<Product>
   {
   let headers=new HttpHeaders();
   headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
  return this.httpClient.get<Product>('http://localhost:8087/smart-shop-service/search-box/item/'+code,{headers}); 
    }
    addProducts(product:Product):Observable<Product>
 {
  let headers=new HttpHeaders();
  headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
      return this.httpClient.post<Product>('http://localhost:8087/smart-shop-service/search-box/',product,{headers}); 
     }
     deleteProducts(code:string):Observable<any>
     {
      let headers=new HttpHeaders();
      headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
          return this.httpClient.delete('http://localhost:8087/smart-shop-service/search-box/'+code,{headers}); 
      }
      getAllProducts():Observable<Product[]>
   {
   let headers=new HttpHeaders();
   headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
  return this.httpClient.get<Product[]>('http://localhost:8087/smart-shop-service/search-box/products/',{headers}); 
    }
    getBill(name:string):Observable<PurchaseHistory[]>
    {
    let headers=new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+this.authservice.getToken());
   return this.httpClient.get<PurchaseHistory[]>('http://localhost:8087/smart-shop-service/search-box/bill/'+name,{headers}); 
     }
     postBill(contact: string, code: string, quantity: number): Observable<PurchaseHistory> {
      //console.log("1234567890 "+product.productName);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+this.authservice.getToken());
      console.log("in postBill");
     
        return this.httpClient.post<PurchaseHistory>('http://localhost:8087/smart-shop-service/search-box/bill/'+contact+'/'+code+'/'+quantity,{headers});
    }
 
   
}