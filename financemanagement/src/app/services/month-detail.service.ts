import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AmountBase } from '../interfaces/amount-base';
import { HttpService } from './http.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MonthDetailService {

  private _refresh$ = new Subject<any>();

  constructor(private httpService: HttpService) { }

  get refresh$() {
    return this._refresh$;
  }


  getMonth(id: number){
    const url: string = environment.endpoints.months.viewset + id;
    return this.httpService.getAuth(url);
  }

  getAmounts(idMonth: number) {
    const url: string = environment.endpoints.months.amount.start +
      idMonth + environment.endpoints.months.amount.end;

    return this.httpService.getAuth(url);
  }



  getAnalysis(montId: number) {
    const url = 'months/' + montId + "/analysis";
    return this.httpService.getAuth(url);
  }


  addAmountBase(idMonth: number, serviceName: string, data: AmountBase) {
    const url: string = environment.endpoints.amountBase.create.start +
      idMonth + environment.endpoints.amountBase.create.end + serviceName;

    return this.httpService.postAuth(url, data)
      .pipe(
        tap(() => {
          this._refresh$.next();
        }
        ));
  }

  addAmountBaseXML(idMonth: number, serviceName: string, data: any = {}) {
    const url: string = environment.endpoints.amountBase.import.start +
      idMonth + environment.endpoints.amountBase.import.end + serviceName;

    return this.httpService.postXml(url, data)
      .pipe(
        tap(() => {
          this._refresh$.next();
        }
        ));
  }

  deleteAmount(isExpense: boolean, id: number) {
    let env = environment.endpoints;
    let url: string = isExpense ? env.expense.viewset : env.entry.viewset;
    return this.httpService.deleteAuth(url, id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        }
        ));
  }

  getCategoriesAll() {
    const url: string = environment.endpoints.category.all;
    return this.httpService.getAuth(url);
  }

}
