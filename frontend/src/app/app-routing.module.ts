import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailsComponent } from './product-details/product-details.component'

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductAddEditComponent },
  { path: 'products/edit/:id', component: ProductAddEditComponent },
  { path: 'products/:id', component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


