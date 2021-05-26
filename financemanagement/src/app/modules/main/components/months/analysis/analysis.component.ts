import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonthDetail } from 'src/app/interfaces/months';
import { MonthDetailService } from 'src/app/services/month-detail.service';
import { Analysis } from '../../../../../interfaces/analysis';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
/**
 * Componente para el análisis del mes
 */
export class AnalysisComponent implements OnInit, OnDestroy {
  /***
   * Objeto del mes
   */
  @Input() month?: MonthDetail;
  /**
   * Objeto del Analisis
   */
  analysis?: Analysis;
  /**
   * Suscripción para refrescar el componente
   */
  refreshSubscription?: Subscription;

  constructor(private monthService: MonthDetailService) { }

  ngOnInit(): void {
    this.getAnalysis();
    this.refreshSubscription = this.monthService.refresh$.subscribe(() => {
      this.getAnalysis();
    })
  }
  /**
   * Obtiene el análisis del mes
   */
  getAnalysis() {
    if (this.month?.month.id) {
      this.monthService.getAnalysis(this.month.month.id).subscribe(
        (data) => {
          this.analysis = data as Analysis;
        },
        (error) => {
        }
      )
    }
  }

  ngOnDestroy(){
    this.refreshSubscription?.unsubscribe();
  }  
}
