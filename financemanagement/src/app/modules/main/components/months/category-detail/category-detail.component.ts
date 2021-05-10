import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { AmountList } from 'src/app/interfaces/amount-base';
import { MonthDetail } from 'src/app/interfaces/months';
import { MonthDetailService } from 'src/app/services/month-detail.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  @Input() month?: MonthDetail;

  amountData?: AmountList[];
  loading: boolean = false;

  refreshSubscription?: Subscription;

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

  getAmounts() {
    if (this.month?.month.id) {
      this.loading = true;

      this.monthService.getAmounts(this.month.month.id).subscribe(
        (data) => {
          this.loading = false;
          this.amountData = data as AmountList[];
        }, (error) => {
          console.log(error);
          this.loading = false;
        }
      )
    }
  }

  getServiceName(isExpense: any) {
    return (isExpense) ? "Gasto" : "Ingreso";
  }

  clear(table: Table) {
    table.clear();
  }

  deleteAmountAction(id: number, isExpense: boolean) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este registro?',
      accept: () => {
  
        this.deleteAmount(isExpense, id);
      }
    });

  }

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

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }


  ngOnDestroy(){
    this.refreshSubscription?.unsubscribe();
  }

}
