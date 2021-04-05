import { Component, OnInit } from '@angular/core';
import { Months } from 'src/app/interfaces/months';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {

  months: Months[] = [{
    date: '05/04/2021',
    total_entries: 250,
    total_expenses: 1509,
  },
  {
    date: '05/05/2021',
    total_entries: 250,
    total_expenses: 1509,
  },
  {
    date: '05/06/2021',
    total_entries: 250,
    total_expenses: 1509,
  },
  {
    date: '05/07/2021',
    total_entries: 250,
    total_expenses: 1509,
  }

];

  constructor() { }

  ngOnInit(): void {
  }

}
