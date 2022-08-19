import {Component, OnInit} from '@angular/core';
import { Food } from '../model/food.model';
import { FoodRepository } from './../model/food.repository';
import { Cart } from '../model/cart.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-food-store',
  templateUrl: './food-store.component.html',
  styleUrls: ['./food-store.component.css']
})
export class FoodStoreComponent implements OnInit {
  public selectedAuthor = null;
  public foodsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: FoodRepository,
              private cart: Cart,
              private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.foods;
  }
  get foods(): Food[]
  {
    const pageIndex = (this.selectedPage - 1) * this.foodsPerPage;
    return this.repository.getFoods(this.selectedAuthor)
    .slice(pageIndex, pageIndex + this.foodsPerPage);
  }

  get authors(): string[]
  {
    return this.repository.getAuthors();
  }

  changeAuthor(newAuthor?: string): void
  {
    this.selectedAuthor = newAuthor;
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.foodsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number
  {
    return Math.ceil(this.repository
      .getFoods(this.selectedAuthor).length / this.foodsPerPage);
  }

  addFoodToCart(food: Food): void
  {
    this.cart.addLine(food);
    this.router.navigateByUrl('/cart');
  }
}
