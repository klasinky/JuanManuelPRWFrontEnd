import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryDetail } from 'src/app/interfaces/category';
@Component({
  selector: 'app-chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.scss']
})
/**
 * Componente para mostrar el gráfico de los Amount Base por categoría
 */
export class ChartMonthComponent implements OnInit {
  /**
   * Componete del gráfico
   */
  @ViewChild('ChartContainer') chartCointainer?: ElementRef;
  /**
   * Indicia si es gasto o ingreso
   */
  @Input() isExpense?: boolean;
  /**
   * Lista de las categorías
   */
  @Input() categories?: CategoryDetail[];
  /**
   * Muestra el spinner de carga
   */
  loading = true;
  /** Configuración del gráfico */
  single?: any[];

  viewX: number = 500;
  viewY: number = 300;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = true;
  yAxisLabel = 'Total';
  colorScheme = {
    domain: ['#46b097', '#3eb0a6', '#3e9bb0', '#3eb07c']
  };
  /** */


  constructor() {}

  /**
   * Refresca el gráfico 
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    this.setCharts();
  }

  ngOnInit() {
    this.setCharts();
  }

  /**
   * Asigna los valores para construir el gráfico 
   */
  setCharts() {
    const single: any[] = [];
    this.categories?.forEach((category: CategoryDetail) => {
      single.push({
        name: category.category.name,
        value: (this.isExpense) ?
          category.category.total_expenses :
          category.category.total_entries
      })
    })
    Object.assign(this, { single });
    setTimeout(() => {
      let x = this.chartCointainer?.nativeElement.offsetWidth;
      this.viewX = x;
      this.loading = false;
    }, 500);
  }

  /**
   * 
   * @param value Cantidad
   * @returns Retorna el valor formateado con el signo de la divisa delante del value
   */
  formatingY(value: any) {
    return value;
  }

  /**
   * Al cambiar el tamaño de la pantalla se modifica los valores de viewX
   * @param event tamaño de la pantalla
   */
  onResize(event: any) {
    let x = this.chartCointainer?.nativeElement.offsetWidth;
    this.viewX = x;
  }

}
