import { Component, Input, OnInit } from '@angular/core';
import { Months } from '../../../../../interfaces/months';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
  
})
export class ListDetailComponent implements OnInit {

  @Input() month!: Months;

  

  constructor() { }

  ngOnInit(): void {
    
  }

}
