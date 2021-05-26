import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { AmountList } from 'src/app/interfaces/amount-base';
import { MonthDetail } from 'src/app/interfaces/months';
import { MonthDetailService } from 'src/app/services/month-detail.service';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
/**
 * Componente para mostrar la lista de los ingresos y gastos 
 */
export class CategoryDetailComponent implements OnInit, OnDestroy {
  /**
   * Objeto del mes
   */
  @Input() month?: MonthDetail;
  /**
   * Lista de los ingresos y gastos
   */
  amountData?: AmountList[];
  /**
   * Indica si se muestra el spinner de carga
   */
  loading: boolean = false;
  /**
   * Suscripción para refrescar el componete
   */
  refreshSubscription?: Subscription;
  /**
   * Tabla de Ingresos y gastos
   */
  @ViewChild('dt1') dt1?: Table;

  constructor(private monthService: MonthDetailService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAmounts();
    this.refreshSubscription = this.monthService.refresh$.subscribe(() => {
      this.getAmounts();
    })
  }
  /**
   * Obtiene la lista de ingresos y gastos
   */
  getAmounts() {
    if (this.month?.month.id) {
      this.loading = true;

      this.monthService.getAmounts(this.month.month.id).subscribe(
        (data) => {
          this.loading = false;
          this.amountData = data as AmountList[];
        }, (error) => {
          this.loading = false;
        }
      )
    }
  }
  /**
   * Regresa el nombre del servicio
   * @param isExpense {boolean}
   */
  getServiceName(isExpense: any) {
    return (isExpense) ? "Gasto" : "Ingreso";
  }
  /**
   *  Limpia la tabla
   * @param table {Table}
   */
  clear(table: Table) {
    table.clear();
  }
  /**
   * Elimina un registro
   * @param id {number} ID del item
   * @param isExpense {boolean} Indicia si es ingreso o gasto
   */
  deleteAmountAction(id: number, isExpense: boolean) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este registro?',
      accept: () => {
        this.deleteAmount(isExpense, id);
      }
    });

  }
  /**
   * Elimina un registro
   * @param isExpense {boolean} Indicia si es ingreso o gasto
   * @param id {number} ID del item
   */
  deleteAmount(isExpense: boolean, id: number) {
    this.monthService.deleteAmount(isExpense, id).subscribe(
      (data) => {
        this.toastr.success('Registro eliminado');
      },
      (error) => {
        this.toastr.error('Ha ocurrido un error');

      }
    )
  }
  /**
   * Aplica los filtros a la tabla
   */
  applyFilterGlobal($event: any, stringVal: string) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  /**
   * Elimina la suscripción
   */
  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }

}
