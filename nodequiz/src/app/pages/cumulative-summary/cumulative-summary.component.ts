/*
=====================================
  ; Title: Cumulative Summary Component
  ; Author: Tyler Armstrong
  ; Date: 2 Oct 2019
  ; Description: Component for results.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CumulativeSummaryService } from '../../shared/services/cumulative-summary.service';

@Component({
  selector: 'app-cumulative-summary',
  templateUrl: './cumulative-summary.component.html',
  styleUrls: ['./cumulative-summary.component.css'],
  providers: [CumulativeSummaryService]
})
export class CumulativeSummaryComponent implements OnInit {
  summaryData;
  displayedColumns: string[] = ['user', 'quiz', 'date', 'score'];

  constructor(private summaryService: CumulativeSummaryService) { }

  ngOnInit() {
    this.summaryService.get()
      .subscribe(res => {
        this.summaryData = res;
      });
  }

}
