/*
=====================================
  ; Title: App Component
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: App root.
======================================
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'Node Quiz';

  constructor(private router: Router, private cookie: CookieService) {}

  ngOnIt() {
    const cookieValue: string = this.cookie.get('isAuthenticated');
    if (cookieValue) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/session/login']);
    }
  }
}
