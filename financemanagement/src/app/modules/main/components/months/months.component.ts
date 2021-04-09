import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthConstants } from 'src/app/config/auth=constant';
import { Months } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {

  months!: Months[];

  constructor(private httpService: HttpService, 
    private storageService: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMonths()
  }

  async getMonths() {
    this.httpService.getAuth('months/all').subscribe(
      (data: any) => {
        this.months = data.results as Months[]; 
      },
      (error) => {
      }
    )
  }

  async deleteMonth(month: Months){
    this.httpService.deleteAuth(month.url + '').subscribe(
      (data: any) => {
        this.months.splice(this.months.indexOf(month), 1);
        this.toastr.success('Has eliminado el mes correctamente','Mes eliminado');
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
