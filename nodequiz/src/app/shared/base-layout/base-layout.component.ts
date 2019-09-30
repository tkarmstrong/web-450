/*
=====================================
  ; Title: Base-layout Component
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: Page layout.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  constructor(private router: Router, private cookie: CookieService) { }

  ngOnInit() {
  }

  userLogout() {
    this.cookie.delete('isAuthenticated');
    this.router.navigate(['/session/login']);
  }

}
