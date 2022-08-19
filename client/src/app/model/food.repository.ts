import { Injectable } from '@angular/core';
import { Food } from './food.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class FoodRepository
{
  private foods: Food[] = [];
  private authors: string[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getFoods().subscribe(data => {
      this.foods = data;
      this.authors = data.map(b => b.author)
        .filter((a, index, array) => array.indexOf(a) === index).sort();
    });
  }

  getFoods(author: string = null): Food[]
  {
    return this.foods
      .filter(b => author == null || author === b.author);
  }

  getFood(id: number): Food
  {
    return this.foods.find(b => b._id === id);
  }

  getAuthors(): string[]
  {
    return this.authors;
  }
}
