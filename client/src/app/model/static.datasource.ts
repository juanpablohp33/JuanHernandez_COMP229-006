import { Injectable } from '@angular/core';
import { Food } from './food.model';
import { Observable, from } from 'rxjs';
import { Order } from './order.model';

@Injectable()
export class StaticDataSource
{
  private foods: Food[] =
  [
    new Food(1, 'Food 1', 'Author 1', 'Year 1', 'Short Description 1' , 10),
    new Food(2, 'Food 2', 'Author 1', 'Year 2', 'Short Description 2' , 10),
    new Food(3, 'Food 3', 'Author 1', 'Year 3', 'Short Description 3' , 10),
    new Food(4, 'Food 4', 'Author 1', 'Year 4', 'Short Description 4' , 10),
    new Food(5, 'Food 5', 'Author 2', 'Year 6', 'Short Description 6' , 10),
    new Food(6, 'Food 6', 'Author 2', 'Year 6', 'Short Description 6' , 10),
    new Food(7, 'Food 7', 'Author 2', 'Year 7', 'Short Description 7' , 10),
    new Food(8, 'Food 8', 'Author 2', 'Year 8', 'Short Description 8' , 10),
    new Food(9, 'Food 9', 'Author 3', 'Year 9', 'Short Description 9' , 10),
    new Food(10, 'Food 10', 'Author 3', 'Year 10', 'Short Description 10' , 10),
    new Food(11, 'Food 11', 'Author 3', 'Year 11', 'Short Description 11' , 10),
    new Food(12, 'Food 12', 'Author 4', 'Year 12', 'Short Description 12' , 10),
    new Food(13, 'Food 13', 'Author 4', 'Year 13', 'Short Description 13' , 10),
    new Food(14, 'Food 14', 'Author 4', 'Year 14', 'Short Description 14' , 10),
    new Food(15, 'Food 15', 'Author 4', 'Year 15', 'Short Description 15' , 10),
  ];

  getFoods(): Observable<Food[]>
  {
    return from([this.foods]);
  }

  saveOrder(order: Order): Observable<Order>
  {
    console.log(JSON.stringify(order));
    return from ([order]);
  }
}
