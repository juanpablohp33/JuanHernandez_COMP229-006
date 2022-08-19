import { NgModule } from '@angular/core';
import { FoodRepository} from './food.repository';
import { StaticDataSource } from './static.datasource';
import { Cart } from './cart.model';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { Order } from './order.model';
import { OrderRepository } from './order.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [FoodRepository, StaticDataSource, Cart, Order, OrderRepository,
  {provide: StaticDataSource, useClass: RestDataSource},
  RestDataSource]
})
export class ModelModule {}
