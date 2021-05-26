import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Months } from 'src/app/interfaces/months';

@Component({
  selector: 'app-chart-difference',
  templateUrl: './chart-difference.component.html',
  styleUrls: ['./chart-difference.component.scss']
})
/**
 * Componente para mostrar la diferencia entre Gastos e Ingresos
 */
export class ChartDifferenceComponent implements OnInit {
  /**
   * Componente del gráfico
   */
  @ViewChild('ChartDifferenceContainer') chartCointainer?: ElementRef;
  /**
   * Objeto del mes
   */
  @Input() month?: Months;
  /** Configuración del Gráfico */
  single?: any[];

  viewX: number = 500;
  viewY: number = 300;
  // options
  colorScheme = {
    domain: ['#409145', '#c43131']
  };
  /** */


  constructor() { }
  /**
   * Refresca el gráfico 
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    this.setCharts();
  }

  ngOnInit(): void {
    this.setCharts();
  }

  /**
   * Construye el gráfico 
   */
  setCharts() {
    const single: any[] = [];
    single.push({
      name: "Ingresos",
      value: this.month?.total_entries
    });
    single.push({
      name: "Gastos",
      value: this.month?.total_expenses
    });

    Object.assign(this, { single });
    setTimeout(() => {
      let x = this.chartCointainer?.nativeElement.offsetWidth;
      this.viewX = x;
    }, 500);
  }
  /**
   * Calcula el tamaño indicado del gráfico para que sea responsive 
   * @param event {any}
   */
  onResize(event: any) {
    let x = this.chartCointainer?.nativeElement.offsetWidth;
    this.viewX = x;
  }
}
