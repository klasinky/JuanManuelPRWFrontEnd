import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Stock } from 'src/app/interfaces/stock';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-suscribe',
  templateUrl: './stock-suscribe.component.html',
  styleUrls: ['./stock-suscribe.component.scss']
})
export class StockSuscribeComponent implements OnInit {

  stocks?: Stock[];
  formSuscribeStock: FormGroup;
  @Output() createStock: EventEmitter<Stock> = new EventEmitter();

  constructor(private httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.formSuscribeStock = this.getFormSuscribeStock();
  }

  ngOnInit(): void {
    this.getStockListAction();
  }

  getFormSuscribeStock() {
    return this.fb.group({
      'stock': [null, Validators.required]
    })
  }

  changeStock(e: any) {
    this.formSuscribeStock?.patchValue(e.target.value, {
      onlySelf: true
    })
  }

  getStockListAction() {
    const url: string = environment.endpoints.stocks.all;
    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.stocks = data as Stock[];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  postSuscribeStockAction() {
    if (this.formSuscribeStock.valid) {
      const stockId = this.formSuscribeStock.value.stock;
      const url: string = environment.endpoints.stocks.viewset + stockId;
      this.resetForms();

      this.httpService.postAuth(url).subscribe(
        (data) => {
          const stock = data as Stock;
          this.createStock.emit(stock);
          this.toastr.success('Te has suscrito a una nueva acción.');
        },
        (error) => {
          this.toastr.error(error.error.detail, 'Error');
        }
      )
    }
  }

  resetForms() {
    this.formSuscribeStock.reset();
  }

}
