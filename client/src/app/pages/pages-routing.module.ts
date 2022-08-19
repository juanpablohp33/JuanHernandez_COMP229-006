import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./home/HomeComponent";
import {StoreFirstGuard} from '../guards/storeFirst.guard';
import {AboutComponent} from './about/about.component';
import {ProductsComponent} from './products/products.component';
import {ServicesComponent} from './services/services.component';
import {FoodStoreComponent} from '../food-store/food-store.component';
import {CartDetailComponent} from '../food-store/cart-detail/cart-detail.component';
import {CheckoutComponent} from '../food-store/checkout/checkout.component';
import {ContactComponent} from './contact/contact.component';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {path: 'store',
    component: PagesComponent,
    children: [
      {path: 'home', component: HomeComponent, data: {title: 'Home'}, canActivate: [StoreFirstGuard]},
      {path: 'about', component: AboutComponent, data: {title: 'About'}},
      {path: 'products', component: ProductsComponent, data: {title: 'Products'}},
      {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
      {path: 'food-list', component: FoodStoreComponent, data: { title: 'Food Store'}, canActivate: [StoreFirstGuard]},
      {path: 'cart', component: CartDetailComponent, data: { title: 'Shopping Cart'}, canActivate: [StoreFirstGuard]},
      {path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout'}, canActivate: [StoreFirstGuard]},
      {path: 'contact', component: ContactComponent, data: {title: 'Contact'}}
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports : [ RouterModule ]
})
export class PagesRoutingModule { }
