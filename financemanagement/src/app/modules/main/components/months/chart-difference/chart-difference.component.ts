import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Months } from 'src/app/interfaces/months';

@Component({
  selector: 'app-chart-difference',
  templateUrl: './chart-difference.component.html',
  styleUrls: ['./chart-difference.component.scss']
})
export class ChartDifferenceComponent implements OnInit {

  @ViewChild('ChartDifferenceContainer') chartCointainer?: ElementRef;
  @Input() month?: Months;

  single?: any[];
  
  viewX: number = 500;
  viewY: number = 300;
  // options
  colorScheme = {
    domain: ['#A8385E', '#7AA3E5']
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.setCharts();
  }

  ngOnInit(): void {
    this.setCharts();
  }


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

  onResize(event: any) {
    let x = this.chartCointainer?.nativeElement.offsetWidth;
    this.viewX = x;
  }
}
