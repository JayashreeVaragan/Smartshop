import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuperuserComponent } from './site/superuser/superuser.component';
import { ProductComponent } from './product/product/product.component';
import { SearchComponent } from './search/search/search.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { BillingComponent } from './product/billing/billing.component';
import { PurchaseHistoryComponent } from './product/purchase-history/purchase-history.component';

const appRoutes: Routes = [

  { path: 'signup/:type', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'superuser', component: SuperuserComponent },
  { path: 'search-box', component: SearchComponent },
  { path: 'product', component: ProductComponent },
  { path: 'type', component: ProductlistComponent },
  { path: 'product-edit/:code', component: ProductEditComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SuperuserComponent,
    ProductComponent,
    SearchComponent,
    ProductlistComponent,
    ProductEditComponent,
    ProductAddComponent,
    BillingComponent,
    PurchaseHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
