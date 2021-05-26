import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthConstants } from '../config/auth=constant';
import { User } from '../interfaces/user';
import { StorageService } from '../services/storage.service';

@Pipe({
  name: 'currencyGenerator'
})
export class CurrencyGeneratorPipe implements PipeTransform {

  userData?: User
  constructor(public storageService: StorageService, private currencyPipe: CurrencyPipe) {
    this.storageService.getItem(AuthConstants.DATAUSER).subscribe((data: User) => {
      this.userData = data;
    })
  }

  transform(value: any): any {
    if(this.userData)
      return this.currencyPipe.transform(value, this.userData.currency?.label, "symbol");
    
  }

}
