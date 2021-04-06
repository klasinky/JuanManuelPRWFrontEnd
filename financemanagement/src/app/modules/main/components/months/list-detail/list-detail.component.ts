import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Months } from '../../../../../interfaces/months';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
  
})
export class ListDetailComponent implements OnInit {

  @Input() month!: Months;
  @Output() deleteMonth: EventEmitter<Months> = new EventEmitter();

  constructor( ) { }

  ngOnInit(): void {
    
  }

  deleteAction(){
    this.deleteMonth.emit(this.month);
  }
}
