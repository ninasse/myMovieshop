import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { PrintProductComponent } from './components/print-product/print-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PrintProductComponent,
    NotFoundComponent,
    HomeComponent,
    ProductsComponent,
    ProductInformationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
