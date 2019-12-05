import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  types = ["Electronics", "Fashion", "Grocery", "Appliances"];
  editForm: FormGroup;
  productlist: Product;


  constructor(private formBuild: FormBuilder, private productService: ProductServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const productCode = this.route.snapshot.paramMap.get('code');
    this.productService.getProducts(productCode).subscribe(
      (data) => {
        // data.dateOfLaunch=new Date(data.dateOfLaunch)
        this.productlist = data;
        this.form();
      })
    this.form();
  }
  form() {
    this.editForm = this.formBuild.group({
      editName: [this.productlist.productName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      editURL: [this.productlist.image, [
        Validators.required
      ]],
      editBrand: [this.productlist.productBrand, [
        Validators.required
      ]],
      editStock: [this.productlist.stockCount, [
        Validators.required
      ]],
      rate: [this.productlist.rate, [
        Validators.required
      ]],
      manufactureDate: [this.productlist.manufactureDate, [
        Validators.required
      ]],
      expiryDate: [this.productlist.expiryDate, [
        Validators.required
      ]],
      addDate: [this.productlist.addDate, [
        Validators.required
      ]],

      type: [this.productlist.productType, [
        Validators.required
      ]],
      aisle: [this.productlist.aisle, [
        Validators.required
      ]],
      shelf: [this.productlist.shelf, [
        Validators.required
      ]],
    })
  }
  get editName() {
    return this.editForm.get('editName');
  }
  get editURL() {
    return this.editForm.get('editURL');
  }
  get editBrand() {
    return this.editForm.get('editBrand');
  }
  get editStock() {
    return this.editForm.get('editStock');
  }
  get rate() {
    return this.editForm.get('rate');
  }
  get manufactureDate() {
    return this.editForm.get('manufactureDate');
  }
  get expiryDate() {
    return this.editForm.get('expiryDate');
  }
  get addDate() {
    return this.editForm.get('expiryDate');
  }
  get type() {
    return this.editForm.get('type');
  }
  get aisle() {
    return this.editForm.get('aisle');
  }
  get shelf() {
    return this.editForm.get('shelf');
  }
  onSaveClick() {
    let newList: Product = {
      productCode: this.productlist.productCode, productName: this.editForm.value["editName"], productBrand: this.editForm.value["editBrand"],
      stockCount: this.editForm.value["editStock"], rate: this.editForm.value["rate"], manufactureDate: new Date(this.editForm.value["manufactureDate"]), expiryDate: new Date(this.editForm.value["expiryDate"]),
      addDate: new Date(this.editForm.value["addDate"]),
      aisle: this.editForm.value["aisle"],
      shelf: this.editForm.value["shelf"], productType: this.editForm.value["type"],
      image: this.editForm.value["editURL"], quantity: null
    }

    this.productService.modifyProducts(newList).subscribe(
      (data) => {
        newList = data;
        this.router.navigate(['search-box'])
      })

  }

}
