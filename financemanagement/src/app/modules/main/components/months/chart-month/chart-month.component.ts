import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoryDetail } from 'src/app/interfaces/category';
@Component({
  selector: 'app-chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.scss']
})

export class ChartMonthComponent implements OnInit {

  @ViewChild('ChartContainer') chartCointainer?: ElementRef;
  @Input() isExpense?: boolean;
  @Input() categories?: CategoryDetail[];

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
    domain: ['#A8385E', '#7AA3E5', '#ABE3F5', '#A8385E', '#1B1E27']
  };

  constructor() {

  }


  ngOnChanges(changes: SimpleChanges) {
    this.setCharts();
  }

  ngOnInit() {
    this.setCharts();

  }

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
      // if (x > 480) {
      //   x = 480;
      // }
      this.viewX = x;
    }, 500);
  }

  formatingY(value: any) {
    return "€" + value;
  }

  onResize(event: any) {
    let x = this.chartCointainer?.nativeElement.offsetWidth;
    // if (x > 500) {
    //   x = 500
    // }
    this.viewX = x;
  }

}
