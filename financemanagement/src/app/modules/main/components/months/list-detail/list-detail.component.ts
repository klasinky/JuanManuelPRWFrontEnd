import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Months } from '../../../../../interfaces/months';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],

})
export class ListDetailComponent implements OnInit {

  @Input() month!: Months;
  @Output() deleteMonth: EventEmitter<Months> = new EventEmitter();

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  /**
   * Eliminar el mes
   */
  deleteAction() {
    this.deleteMonth.emit(this.month);
  }

  /**
   * Asigna la ruta para ir a la información del mes
   */
  getDetail() {
    this.route.navigate(['dashboard/months/detail/' + btoa(escape(JSON.stringify(this.month.id)))]);
  }
}
