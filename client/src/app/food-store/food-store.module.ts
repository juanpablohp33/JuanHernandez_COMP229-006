import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { FoodStoreComponent } from '../food-store/food-store.component';
import { CounterDirective } from './counter.directive';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
  declarations: [FoodStoreComponent, CounterDirective, CartDetailComponent, CheckoutComponent],
  exports: [FoodStoreComponent, CounterDirective, CartDetailComponent, CheckoutComponent]
})
export class FoodStoreModule {}
