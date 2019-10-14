/*
=====================================
  ; Title: Quiz Component
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Component for quizzes.
======================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuizService } from '../shared/services/quiz.service';
import { MatDialog } from '@angular/material';
import { ResultsDialogComponent } from '../shared/results-dialog/results-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quiz;
  quizResult;
  numberCorrect = 0;
  apiURL = 'http://localhost:3000/api/summary';
  summary = {
    userId: '',
    title: '',
    dateTaken: moment().format('MM/DD/YYYY'),
    results: [],
    score: null
  };

  constructor(
    private router: Router,
    private quizService: QuizService,
    private http: HttpClient,
    private cookie: CookieService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.quizService.get()
      .subscribe(res => {
        this.quiz = res;
      });
  }

  onSubmit(quizResult) {

  /* -----------------------------------------------
  ? Steps for cumulative summary object             |
  ------------------------------------------------- */

    // 1. 'User' who is taking quiz
    this.getUser();

    // 2. 'Title' of quiz
    this.getTitleOfQuiz();

    // 3. User's 'Result'
    this.buildQuizResultFinal(quizResult);

    // 4. User's 'Score' of quiz
    this.calculateScore();

    // 5. Save final result to cumulative summary collection
    this.http.post(this.apiURL, this.summary).subscribe(res => {
      // console.log(this.summary);
    }, err => {

    }, () => {
      // * 6. Open dialog/display results
      this.openResultsDialog();
    });

  }

  /* ----------------------------------------------
   ? onSubmit() Methods                            |
   ----------------------------------------------- */

  // (1)
  getUser() {
    const cookies = this.cookie.getAll();

    if (!this.cookie.check) {
      this.router.navigate(['/dashboard']);
    }

    for (const key in cookies) {
      if (cookies.hasOwnProperty(key)) {
        if (key !== 'isAuthenticated') {
          this.summary.userId = key;
        }
      }
    }
  }

  // (2)
  getTitleOfQuiz() {
    for (const key in this.quiz) {
      if (this.quiz.hasOwnProperty(key)) {
        const questions = this.quiz[key];
        if (key === 'title') {
          this.summary.title = this.quiz[key];
        }
      }
    }
  }

  // (3)
  buildQuizResultFinal(quizResult) {
    for (const key in quizResult) {
      if (quizResult.hasOwnProperty(key)) {
        const answer = quizResult[key];
        this.summary.results.push(answer);
      }
    }
  }

  // (4)
  calculateScore() {
    this.summary.results.forEach(element => {
      if (element.flag === true) {
        this.numberCorrect++;
      }
    });

    this.summary.score = (this.numberCorrect / this.summary.results.length) * 100;
  }

  // * (5) has no method: see step 5 in onSubmit()

  // (6)
  openResultsDialog() {
    console.log(this.summary);
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      width: '80%',
      height: '350px',
      data: this.summary,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      // this.router.navigate(['/dashboard']);
    });
  }

}
