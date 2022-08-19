import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLayoutComponent} from './external-layout.component';
import {ExternalLayoutRoutingModule} from './external-layout-routing.module';
import {LoginModule} from './components/login/login.module';
import {RegisterModule} from './components/register/register.module';

@NgModule({
  imports: [
    CommonModule,
    ExternalLayoutRoutingModule,
    LoginModule,
    RegisterModule
  ],
  declarations: [ExternalLayoutComponent]
})
export class ExternalLayoutModule { }
