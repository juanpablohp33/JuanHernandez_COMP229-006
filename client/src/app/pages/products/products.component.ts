import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../partials/base-page/base-page.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestDataSource} from '../../model/rest.datasource';
import {NewFood} from '../../classes/NewFood';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BasePageComponent implements OnInit {

  private newFood: NewFood = {} as NewFood;

  foodForm: FormGroup;

  constructor(route: ActivatedRoute,
              private dataSource: RestDataSource,
              private router: Router,
              private formBuilder: FormBuilder) {
    super(route);
  }
  ngOnInit(): void {
    this.foodForm = this.instanceForm();
  }

  private instanceForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      author: ['', Validators.required],
      published: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  addFood(): void {
    this.newFood = this.foodForm.value;
    this.dataSource.addFood(this.newFood).subscribe(data => {
      this.router.navigate(['/store/food-list']);
    }, err => {
    });
  }

}
