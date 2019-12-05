import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  types=["Electronics","Fashion","Grocery","Appliances"];
  editForm: FormGroup;
  productlist:Product;
  

  constructor(private formBuild:FormBuilder,private productService:ProductServiceService,private route : ActivatedRoute,private router:Router) { }

  ngOnInit() {
      this.form();
    }
    form(){
    this.editForm = this.formBuild.group({
      editCode: [null,[
        Validators.required
      ]],
     editName: [null,[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      editURL: [null,[
        Validators.required
      ]],
      editBrand: [null,[
        Validators.required
      ]],
      editStock: [null,[
        Validators.required
      ]],
      rate: [null,[
        Validators.required
      ]],
      manufactureDate: [null,[
        Validators.required
      ]],
      expiryDate: [null,[
        Validators.required
      ]],
      addDate: [null,[
        Validators.required
      ]],
      
      type: [null,[
        Validators.required
      ]],
      aisle: [null,[
        Validators.required
      ]],
      shelf: [null,[
        Validators.required
      ]],
    })
  }
  get editCode() {
    return this.editForm .get('editCode');
  }
  get editName() {
    return this.editForm .get('editName');
  }
  get editURL() {
    return this.editForm .get('editURL');
  }
  get editBrand() {
    return this.editForm .get('editBrand');
  }
  get editStock() {
    return this.editForm .get('editStock');
  }
  get rate() {
    return this.editForm .get('rate');
  }
  get manufactureDate() {
    return this.editForm .get('manufactureDate');
  }
  get expiryDate(){
    return this.editForm .get('expiryDate');
  }
  get addDate(){
    return this.editForm .get('expiryDate');
  }
  get type(){
    return this.editForm .get('type');
  }
  get aisle(){
    return this.editForm .get('aisle');
  }
  get shelf(){
    return this.editForm .get('shelf');
  }
  onSaveClick() {
  let newList:Product = {productCode:this.editForm.value["editCode"],productName:this.editForm.value["editName"],productBrand:this.editForm.value["editBrand"],
  stockCount:this.editForm.value["editStock"],rate:this.editForm.value["rate"],manufactureDate:new Date(this.editForm.value["manufactureDate"]), expiryDate:new Date(this.editForm.value["expiryDate"]),
  addDate:new Date(this.editForm.value["addDate"]),
  aisle:this.editForm.value["aisle"],
  shelf:this.editForm.value["shelf"], productType:this.editForm.value["type"],
  image:this.editForm.value["editURL"],quantity:null}

    this.productService.addProducts(newList).subscribe(
      (data) =>{
        newList=data;
        this.router.navigate(['search-box'])
        })
        
  }
  
}

