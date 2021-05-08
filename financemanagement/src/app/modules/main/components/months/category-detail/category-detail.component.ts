import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AmountBase, AmountList } from 'src/app/interfaces/amount-base';
import { Category, CategoryDetail } from 'src/app/interfaces/category';
import { MonthDetail, Months } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  @Input() month?: MonthDetail;

  amountData?: AmountList[];
  loading: boolean = false;

  @ViewChild('dt1') dt1?: Table;

  constructor(private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAmounts();
  }

  getAmounts() {
    this.loading = true;
    const url: string = environment.endpoints.months.amount.start +
      this.month?.month.id + environment.endpoints.months.amount.end;

    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.loading = false;
        this.amountData = data as AmountList[];
        console.log(this.amountData);
      }, (error) => {
        console.log(error);
        this.loading = false;
      }
    )
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
        let env = environment.endpoints;
        let url: string = isExpense ? env.expense.viewset : env.entry.viewset;
        this.deleteAmount(url, id);
      }
    });

  }

  deleteAmount(url: string, id: number) {
    this.httpService.deleteAuth(url, id).subscribe(
      (data) => {
        this.getAmounts();
        console.log("Eliminao")
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

}
