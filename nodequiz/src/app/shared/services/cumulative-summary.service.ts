/*
=====================================
  ; Title: Summary Service
  ; Author: Tyler Armstrong
  ; Date: 13 Oct 2019
  ; Description: Service for summary.
======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CumulativeSummaryService {

  constructor(private http: HttpClient) { }

  get() {
    const apiURL = `http://localhost:3000/api/summary`;
    return this.http.get(apiURL);
  }
}
