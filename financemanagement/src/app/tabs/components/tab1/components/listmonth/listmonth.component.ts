import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listmonth',
  templateUrl: './listmonth.component.html',
  styleUrls: ['./listmonth.component.scss'],
})
export class ListmonthComponent implements OnInit {
  
  monthsList = moths;

  constructor() { }

  ngOnInit() {}

}

const moths = [
  {id:1,date:"Febrero",total_entries:123.2,total_expenses:100},
  {id:2,date:"Marzo",total_entries:512.2,total_expenses:123},
  {id:3,date:"Abril",total_entries:512.2,total_expenses:123},
  {id:4,date:"Mayo",total_entries:512.2,total_expenses:123},
]