import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food.model';
import { Order } from './order.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import {LoginRequest} from '../classes/LoginRequest';
import {Session} from '../classes/Session';
import {SessionStorage} from '../classes/SessionStorage';
import {NewUser} from '../classes/NewUser';
import {NewFood} from "../classes/NewFood";

const PROTOCOL = 'http';
const PORT = 3500;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RestDataSource
{
  baseUrl: string;
  authToken: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    })
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService)
  {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  // tslint:disable-next-line:typedef
  public authenticationHeaders(token?: string) {
    const sessionStorage: SessionStorage = JSON.parse(localStorage.getItem('session'));
    const jwt = (token === undefined || token === null) ? sessionStorage.source : token;
    console.log('jwt');
    console.log(jwt);
    console.log(sessionStorage);
    return new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization:  'Bearer ' + jwt
      });
  }
  // tslint:disable-next-line:typedef
  getFoods(): Observable<Food[]>
  {
    this.loadToken();
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization:  'Bearer ' + this.authToken
      });
    return this.http.get<Food[]>(this.baseUrl + 'food-list', {headers, withCredentials: true});
  }

  saveOrder(order: Order): Observable<Order>
  {
    console.log(JSON.stringify(order));
    return this.http.post<Order>(this.baseUrl + 'orders/add', order);
  }

  getOrders(): Observable<Order[]>
  {
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }


  loadToken(): void{
    const token = localStorage.getItem('token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }

  login(loginRequest: LoginRequest): Observable<Session> {
    return this.http.post<Session>(this.baseUrl + 'login', loginRequest, httpOptions);
  }

  logout(): Observable<void> {
    localStorage.removeItem('token');
    return this.http.get<void>(this.baseUrl + 'logout', httpOptions);
  }

  registerUser(user: NewUser): Observable<NewUser>
  {
    console.log(JSON.stringify(user));
    return this.http.post<NewUser>(this.baseUrl + 'register', user);
  }

  addFood(food: NewFood): Observable<NewFood>
  {
    this.loadToken();
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization:  'Bearer ' + this.authToken
      });
    return this.http.post<NewFood>(this.baseUrl + 'food-list/add', food, {headers, withCredentials: true});
  }
}

