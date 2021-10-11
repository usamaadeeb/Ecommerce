import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { SpecificComponent } from './specific/specific.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogoutComponent } from './logout/logout.component';
import {MatFormFieldModule} from '@angular/material/form-field'

import { StripeComponent } from './stripe/stripe.component';
import {MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule }   from '@angular/forms';
import { CartBEComponent } from './cart-be/cart-be.component';
import {NgxsModule} from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin'
import { BackendService } from './backend.service';
import { CartState } from './store/states/cart.state';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    CartComponent,
    CategoryComponent,
    SpecificComponent,
    LoginComponent,
    SignUpComponent,
    LogoutComponent,
    StripeComponent,
    CartBEComponent,
    SidenavComponent,


  ],
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,



    // NGXS
    NgxsModule.forRoot([CartState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),


  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
