import { Injectable } from '@angular/core';
import { Food } from './food.model';

@Injectable()
export class Cart
{
  public lines: CartLine[] = [];
  public itemCount = 0;
  public cartPrice = 0;

  addLine(food: Food, quantity: number = 1): void
  {
    const line = this.lines.find(l => l.food._id === food._id);
    if (line !== undefined)
    {
      line.quantity += quantity;
    }
    else
    {
      this.lines.push(new CartLine(food, quantity));
    }
    this.recalculate();
  }

  updateQuantity(food: Food, quantity: number): void
  {
    const line = this.lines.find(l => l.food._id === food._id);
    if (line !== undefined)
    {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeLine(id: number): void
  {
    const index = this.lines.findIndex(l => l.food._id === id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear(): void
  {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate(): void
  {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.cartPrice += (l.quantity *  l.food.price);
    });
  }
}

export class CartLine
{
  constructor(public food: Food,
              public quantity: number){  }

  get lineTotal(): number
  {
    return this.quantity * this.food.price;
  }
}
