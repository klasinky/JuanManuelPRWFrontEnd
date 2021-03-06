import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SeriesHorizontal } from '@swimlane/ngx-charts';
import { Stock, StockDetail } from 'src/app/interfaces/stock';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  @ViewChild('ChartStockDetailContainer') chartCointainer?: ElementRef;
  @Input() stock?: Stock;
  stockDetail?: StockDetail;

  multi?: any[];
  view: any[] = [700, 300];
  viewX: number = 500;
  viewY: number = 300;
  // options
  colorScheme = {
    domain: ['#65DB9C']
  };
  showLabels: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dia';
  yAxisLabel: string = 'Precio';

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getStockDetailAction();
  }

  /**
   * Asigna los valores para construir el gráfico 
   */
  setCharts() {
    const multi: any[] = [];
    const series: any[] = [];
    this.stockDetail?.prices.forEach(element => {
      let serie = {
        name: element.date,
        value: element.close
      };
      series.push(serie);
    })

    multi.push({
      name: this.stockDetail?.name,
      series: series
    })

    Object.assign(this, { multi });
    setTimeout(() => {
      let x = this.chartCointainer?.nativeElement.offsetWidth;
      this.viewX = x;
    }, 500);
  }

  onResize(event: any) {
    let x = this.chartCointainer?.nativeElement.offsetWidth;
    this.viewX = x;
  }

  /**
   * Obtener la información de la acción
   */
  getStockDetailAction() {
    const url: string = environment.endpoints.stocks.viewset +
      this.stock?.id;

    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.stockDetail = data as StockDetail;
        this.stockDetail.prices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.setCharts();
      },
      (error) => {
      }
    )
  }


}
