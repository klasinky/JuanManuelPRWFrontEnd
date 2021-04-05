import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {

  detail = {
    totalExpenses: 500.23,
    totalEntries: 950.23,
    totalDifference: -200,
  }

  differenceError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getDifferenceColor();
  }

  getDifferenceColor() {    
    this.detail.totalDifference = this.detail?.totalEntries - this.detail?.totalExpenses; 
    this.differenceError = this.detail?.totalDifference <= 0;
  }

}
