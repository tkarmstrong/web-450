/*
=====================================
  ; Title: Presentation Component
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Component for /presentation.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { PresentationService } from '../../shared/services/presentation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  providers: [PresentationService]
})
export class PresentationComponent implements OnInit {
  presentation;
  images: any[];

  constructor(private presentationService: PresentationService, private router: Router) {}

  ngOnInit() {
    this.images = [];
    this.presentationService.get()
      .subscribe(res => {
        this.presentation = res;
        for (const key in this.presentation.slides) {
          if (this.presentation.slides.hasOwnProperty(key)) {
            const element = this.presentation.slides[key];
            this.images.push(element);
          }
        }
      });
  }

  startQuiz($event, presentation) {
    presentation = this.presentation;
    for (const key in presentation) {
      if (presentation.hasOwnProperty(key)) {
        const element = presentation[key];

        if (element === presentation._id) {
          this.router.navigate(['quizzes', presentation.id]);
        }
      }
    }
  }
}
