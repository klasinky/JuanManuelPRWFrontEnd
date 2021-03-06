import { Component, Input, OnInit } from '@angular/core';
import { Months } from 'src/app/interfaces/months';
import { Overview } from 'src/app/interfaces/overview';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
/**
 * Componente para la información general de los gastos del usuario
 */
export class OverViewComponent implements OnInit {
  /**
   * Objeto del Overview
   */
  detail?: Overview;
  /**
   * Indica si la diferencia es positiva o negativa (Ingresos - Gastos)
   */
  differenceError: boolean = false;

  // Filtros
  btnAll: boolean = false;
  btnMonth: boolean = false;
  btnYear: boolean = false;

  btnAllLoading: boolean = false;
  btnMonthLoading: boolean = false;
  btnYearLoading: boolean = false;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getTotal();
  }

  /**
   * Verifica si la diferencia es menor o igual que 0
   */
  getDifferenceColor() {
    if (this.detail?.total_difference)
      this.differenceError = this.detail.total_difference <= 0;
  }

  /**
   * Obtiene el total de ingresos y gastos, se puede utilizar un filtro para
   * buscarlo por año, mes y global
   * @param filter filtro
   */
  getTotal(filter = "?q=all") {
    this.setActiveButton(filter)

    this.httpService.getAuth('months/overview' + filter).subscribe(
      (data) => {
        this.detail = data as Overview;
        this.detail.total_difference = this.detail.total_entries - this.detail.total_expenses;
        this.getDifferenceColor();
        this.clearLoadingButtons();
      },
      (error) => {
      }
    )
  }

  /**
   * Cambia el estado del boton que se esta presionando
   * @param filter filtro
   */
  setActiveButton(filter: string) {
    this.btnAll = false;
    this.btnMonth = false;
    this.btnYear = false;

    if (filter == '?q=all') {
      this.btnAll = true;
      this.btnAllLoading = true;
    } else if (filter == '?q=year') {
      this.btnYear = true;
      this.btnYearLoading = true;
    } else if (filter == '?q=month') {
      this.btnMonth = true;
      this.btnMonthLoading = true;
    }
  }

  /**
   * Coloca el valor por defecto a las variables
   */
  clearLoadingButtons(){
    this.btnAllLoading = false;
    this.btnYearLoading = false;
    this.btnMonthLoading = false;
  }

}
