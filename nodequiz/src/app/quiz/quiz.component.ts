/*
=====================================
  ; Title: Dashboard Component
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Component for quizzes.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quiz;

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.get()
      .subscribe(res => { this.quiz = res; });
  }
}
