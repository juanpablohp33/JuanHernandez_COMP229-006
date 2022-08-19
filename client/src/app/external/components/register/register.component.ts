import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestDataSource} from '../../../model/rest.datasource';
import {NewUser} from '../../../classes/NewUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private newUser: NewUser = {} as NewUser;

  registerForm: FormGroup;
  constructor(private dataSource: RestDataSource,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.instanceForm();
  }

  private instanceForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', Validators.required],
      displayName: ['', Validators.required],
    });
  }

  register(): void {
    this.newUser = this.registerForm.value;
    this.dataSource.registerUser(this.newUser).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
    });
  }

  cancel(): void {
    this.router.navigate(['/login']);
  }
}
