import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartBEComponent } from './cart-be/cart-be.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductComponent } from './product/product.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SpecificComponent } from './specific/specific.component';
import { StripeComponent } from './stripe/stripe.component';


const routes: Routes = [
  {path:'home',component:ProductComponent},
  {path:'Cart',component:CartComponent},
  {path:'Category/:category',component:CategoryComponent},
  {path:'Specific/:specific',component:SpecificComponent},
  {path:'Stripe',component:StripeComponent},
  {path:'Login',component:LoginComponent},
  {path:'SignUp',component:SignUpComponent},
  {path:'Logout',component:LogoutComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
