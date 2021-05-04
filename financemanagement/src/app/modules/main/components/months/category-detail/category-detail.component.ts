import { Component, Input, OnInit } from '@angular/core';
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
  @Input() isExpense?: boolean; // false = Entry , True = Expense
  serviceName?: string;
  amountData?: AmountList[];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAmounts();
  }

  getAmounts(){
    const url: string = environment.endpoints.months.amount.start +
    this.month?.month.id + environment.endpoints.months.amount.end;

    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.amountData = data as AmountList[];
        console.log(this.amountData);
      }
    )
  }

  getServiceName(isExpense: any){
    return (isExpense) ? "Gasto" : "Ingreso";
  }

}
