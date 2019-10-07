/*
=====================================
  ; Title: Dashboard Component
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Component for /dashboard.
======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardCardService {

  constructor(private http: HttpClient) { }

  get() {
    const apiBaseURL = 'http://localhost:3000/api/cards';
    return this.http.get(apiBaseURL);
  }
}
