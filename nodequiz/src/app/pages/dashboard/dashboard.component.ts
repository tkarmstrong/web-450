/*
=====================================
  ; Title: Dashboard Component
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: Component for /dashboard.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { DashboardCardService } from '../../shared/services/dashboard-card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardCardService]
})
export class DashboardComponent implements OnInit {
  cards;
  card;

  constructor(private dashboardCardService: DashboardCardService, private router: Router) {}

  ngOnInit() {
    this.dashboardCardService.get()
      .subscribe(res => {
        this.cards = res;
      });
  }

  // Route to presentation
  startPresentation($event, card) {
    this.card = card;
    for (const key in this.cards) {
      if (this.cards.hasOwnProperty(key)) {
        const element = this.cards[key];

        if (!element) {
          throw console.error('Presentation does not exist.');
        }

        if (element._id === card._id) {
          this.router.navigate(['presentations', card.cardId]);
        }
      }
    }
  }

}
