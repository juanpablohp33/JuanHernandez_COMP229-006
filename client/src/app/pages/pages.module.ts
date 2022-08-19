import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from "./home/HomeComponent";
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { PartialsModule } from '../partials/partials.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';


@NgModule({
  imports: [BrowserModule, FormsModule, PartialsModule, PagesRoutingModule, ReactiveFormsModule],
  declarations: [
    AboutComponent,
    PagesComponent,
    ContactComponent,
    HomeComponent,
    ProductsComponent,
    ServicesComponent
  ],
  exports: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ProductsComponent,
    ServicesComponent,
    PartialsModule]
})
export class PagesModule {}
