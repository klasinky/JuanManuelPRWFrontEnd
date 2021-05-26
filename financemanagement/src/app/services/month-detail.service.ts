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

  /**
   * Regresa el mes
   * @param id {number} id del mes
   */
  getMonth(id: number){
    const url: string = environment.endpoints.months.viewset + id;
    return this.httpService.getAuth(url);
  } 
  /**
   * Regresa los Amount base del mes
   * @param idMonth {number} id del mes
   */
  getAmounts(idMonth: number) {
    const url: string = environment.endpoints.months.amount.start +
      idMonth + environment.endpoints.months.amount.end;

    return this.httpService.getAuth(url);
  }


  /**
   * Regresa el análisis del mes
   * @param montId {number} id del mes
   */
  getAnalysis(montId: number) {
    const url = 'months/' + montId + "/analysis";
    return this.httpService.getAuth(url);
  }

  /**
   * Ingresa un AmountBase
   * @param idMonth {number} id del mes
   * @param serviceName {string} nombre del servicio 
   * @param data {AmountBase}
   */
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
  /**
   * Agrega un AmountBase por XML
   * @param idMonth {number} id del mes
   * @param serviceName {string} Nombre del servicio
   * @param data {any}
   */
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
  /**
   * Elimina un AmountBase
   * @param isExpense {boolean} Indica si es Gasto o ingreso
   * @param id {number} id del mes
   */
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
  /**
   * Retorna todas las categorias
   */
  getCategoriesAll() {
    const url: string = environment.endpoints.category.all;
    return this.httpService.getAuth(url);
  }

}
