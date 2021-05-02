import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Stock } from 'src/app/interfaces/stock';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  stocks?: Stock[];

  constructor(private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStocksAction();
  }

  getStocksAction() {
    const url: string = environment.endpoints.stocks.list;
    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.stocks = data as Stock[];
      }
    )
  }

  unsubscribeStockAction(stock: Stock) {
    const url: string = environment.endpoints.stocks.viewset;
    this.httpService.deleteAuth(url, stock.id).subscribe(
      (data) => {
        this.stocks?.splice(this.stocks?.indexOf(stock), 1);
        this.toastr.success('Te has desuscrito de la acción' + stock.name, 'Acción eliminada');
      },
      (error) => {
        console.log(error)
        this.toastr.error(error.detail, "Ha ocurrido un error");
      }
    )
  }

  addStock(): void {
    this.getStocksAction();
  }

}
