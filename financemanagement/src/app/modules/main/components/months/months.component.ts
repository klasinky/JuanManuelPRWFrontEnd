import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Months } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {

  months!: Months[];

  constructor(private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMonths()
  }

  async getMonths() {
    const url: string = environment.endpoints.months.all;

    this.httpService.getAuth(url).subscribe(
      (data: any) => {
        this.months = data.results as Months[];
      },
      (error) => {
      }
    )
  }

  async deleteMonth(month: Months) {
    const url: string = environment.endpoints.months.viewset + month.id;

    this.httpService.deleteAuth(url).subscribe(
      (data: any) => {
        this.months.splice(this.months.indexOf(month), 1);
        this.toastr.success('Has eliminado el mes correctamente', 'Mes eliminado');
      },
      (error) => {
        this.toastr.error(error.detail, "Ha ocurrido un error");

      }
    )
  }

  addMonth(_month: Months): void {
    this.months.unshift(_month);
  }
}
