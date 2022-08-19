import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExternalLayoutComponent} from './external-layout.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ExternalGuard} from '../guards/external.guard';


const routes: Routes = [
  {
    path: '',
    component: ExternalLayoutComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent, canActivate: [ExternalGuard]}
    ]
  }

];
@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports : [ RouterModule ]
})
export class ExternalLayoutRoutingModule { }
