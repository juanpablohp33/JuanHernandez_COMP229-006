import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodStoreModule } from './food-store/food-store.module';
import { PagesModule } from './pages/pages.module';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UnauthenticatedInterceptor} from './guards/UnauthenticatedInterceptor';
import {LoginModule} from './external/components/login/login.module';
import {ExternalLayoutModule} from './external/external-layout.module';
import {AllInterceptor} from './guards/AllInterceptor';
import { FoodStoreComponent } from './food-store/food-store.component';

export function jwtTokenGetter(): string
{
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FoodStoreModule,
    PagesModule,
    LoginModule,
    PagesModule,
    ExternalLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthenticatedInterceptor,
    multi: true,
  }
 ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AllInterceptor,
      multi: true,
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
