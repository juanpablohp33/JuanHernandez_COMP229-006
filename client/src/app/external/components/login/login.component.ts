import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginRequest} from '../../../classes/LoginRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestDataSource} from '../../../model/rest.datasource';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginRequest: LoginRequest = {} as LoginRequest;
  private callbackUrl: string;
  loginForm: FormGroup;
  buttonDisabled;
  invalidForm = false;

  isIframe = false;

  constructor(private dataSource: RestDataSource,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.loginForm = this.instanceForm();
    this.callbackUrl = this.route.snapshot.queryParams.callback || '/store/food-list';
    this.buttonDisabled = true;
  }

  private instanceForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    console.log('login');
    this.buttonDisabled = true;
    this.invalidForm = true;
    this.loginRequest = this.loginForm.value;
    this.dataSource.login(this.loginRequest)
      .subscribe(data => {
        localStorage.setItem('token', data.token);
        this.router.navigate([this.callbackUrl]);
      }, err => {
        this.buttonDisabled = false;
        this.invalidForm = false;
        alert(err.error.message);
      });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
