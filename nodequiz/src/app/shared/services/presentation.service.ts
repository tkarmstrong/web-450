/*
=====================================
  ; Title: Presentation Component
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Component for presentations.
======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  routeId;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
    ) {}

  get() {
    this.route.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    const apiURL = `http://localhost:3000/api/presentations/${this.routeId}`;
    return this.http.get(apiURL);
  }
}
