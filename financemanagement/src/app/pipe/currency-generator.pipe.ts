import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthConstants } from '../config/auth=constant';
import { User } from '../interfaces/user';
import { StorageService } from '../services/storage.service';

@Pipe({
  name: 'currencyGenerator'
})
/**
 * Pipe para cambiar la currency
 */
export class CurrencyGeneratorPipe implements PipeTransform {
  /**
   * Datos del usuario
   */
  userData?: User
  constructor(public storageService: StorageService, private currencyPipe: CurrencyPipe) {
    this.storageService.getItem(AuthConstants.DATAUSER).subscribe((data: User) => {
      this.userData = data;
    })
  }
  /**
   * Pone el símbolo de la divisa del usuario
   * @param value {any}
   */
  transform(value: any): any {
    if(this.userData)
      return this.currencyPipe.transform(value, this.userData.currency?.label, "symbol");
    
  }

}
