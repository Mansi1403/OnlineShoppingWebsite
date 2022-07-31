import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddProductComponent } from './Retailer/add-product/add-product.component';
import { AppComponent } from './app.component';
import {DisplayRetailersComponent} from './Admin/display-retailers/display-retailers.component'

const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'add-product', component:AddProductComponent},
  {path:'display-retailers', component:DisplayRetailersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
