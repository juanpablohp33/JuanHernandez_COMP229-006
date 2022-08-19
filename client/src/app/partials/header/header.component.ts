import { Component, OnInit } from '@angular/core';
import {RestDataSource} from '../../model/rest.datasource';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataSource: RestDataSource,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.dataSource.logout()
      .subscribe(data => {
        sessionStorage.clear();
        window.location.href = '/login';
        this.router.navigate(['/login']);
      });
  }
}
