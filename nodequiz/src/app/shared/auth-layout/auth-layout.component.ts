/*
=====================================
  ; Title: Auth-layout Component
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: Page layout.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private cookie: CookieService, private router: Router) { }

  ngOnInit() {
  }

  userLogout() {
    this.cookie.deleteAll();
    this.router.navigate(['/session/login']);
  }

}
