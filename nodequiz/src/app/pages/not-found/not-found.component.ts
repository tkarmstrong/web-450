/*
=====================================
  ; Title: Not Found Component
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: Component for /not-found.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router, private cookie: CookieService) { }

  ngOnInit() {
  }

  goHome() {
    const cookieValue: string = this.cookie.get('isAuthenticated');
    if (cookieValue) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/session/login']);
    }
  }

}
