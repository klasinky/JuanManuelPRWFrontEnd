import { Component, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-amount-base',
  templateUrl: './add-amount-base.component.html',
  styleUrls: ['./add-amount-base.component.scss']
})
export class AddAmountBaseComponent implements OnInit {

  @Input() isExpense?: boolean;
  title?: String;
  serviceName?: String;


  constructor(private httpService: HttpService,
    private toastr: ToastrService) {
    this.title = (this.isExpense)?"Egresos":"Ingresos";
    this.serviceName = (this.isExpense)?"expenses":"entries";
  }

  ngOnInit(): void {
  }

  /*postAmountBaseAction(){
    this.httpService.postAuth('months').subscribe(
      (data: any)=>{
        const month = data as Months;
        this.toastr.success('¡Has creado un mes!','Mes creado');
        //this.newMonth.emit(month);
        this.showLoader = false;

      }, (error) => {
        console.log(error.error.detail);
        this.toastr.error(error.error.detail, 'Error al crear mes');
        this.showLoader = false;
      
      }
    )
  }
*/

}
