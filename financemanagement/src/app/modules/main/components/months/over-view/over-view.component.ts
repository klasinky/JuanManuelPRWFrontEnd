import { Component, Input, OnInit } from '@angular/core';
import { Months } from 'src/app/interfaces/months';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {

  @Input() months!: Months[];

  detail = {
    totalExpenses: 0,
    totalEntries: 0,
    totalDifference: 0,
  }

  differenceError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getTotal();
    this.getDifferenceColor();
  }

  getDifferenceColor() {    
    this.differenceError = this.detail?.totalDifference <= 0;
  }

  getTotal(){  
    let totalExpenses = 0;
    let totalEntries = 0;

    this.months.forEach(element => {
      totalExpenses += element.total_expenses;
      totalEntries += element.total_entries;
    });

    this.detail.totalEntries = totalEntries;
    this.detail.totalExpenses = totalExpenses;
    this.detail.totalDifference = totalEntries - totalExpenses;
  }

}
