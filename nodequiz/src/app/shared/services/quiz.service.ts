/*
=====================================
  ; Title: Quiz Service
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Service for quiz.
======================================
*/

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  routeId;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  get() {
    this.route.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    const apiURL = `http://localhost:3000/api/quizzes/${this.routeId}`;
    return this.http.get(apiURL);
  }
}
