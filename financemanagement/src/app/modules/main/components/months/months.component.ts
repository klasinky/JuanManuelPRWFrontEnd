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

  totalMonths?: number;
  nextUrl?: string;
  previousUrl?: string;
  months!: Months[];
  loading: boolean = false;
  numberPagination: number[];

  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private toastr: ToastrService) {
    this.numberPagination = Array(10).fill(0).map((x, i) => i);
  }

  ngOnInit(): void {
    this.getMonths()
  }

  async getMonths() {
    this.loading = true;
    this.httpService.getAuth('months/all').subscribe(
      (data: any) => {
        console.log(data);
        this.loading = false;

        this.totalMonths = data.count;
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        this.months = data.results as Months[];
        console.log("N: " + this.nextUrl);
        console.log("P: " + this.previousUrl);

      },
      (error) => {
        this.loading = false;

      }
    )
  }

  getStyle(){
    return {'background':'#42141E', 
    'border-radius': '0', 
    'height': '85px', 
    'margin-bottom':'0',
    'box-shadow': '2px 20px 30px #42141E'
  }
  }


  changeUrl(isNext: boolean) {

    const url = isNext ? this.nextUrl : this.previousUrl;
    if (url) {
      this.loading = true;
      this.httpService.getAuth(url, true).subscribe(
        (data: any) => {
          this.loading = false;

          console.log(data);
          this.totalMonths = data.count;
          this.nextUrl = data.next;
          this.previousUrl = data.previous;
          this.months = data.results as Months[];
        },
        (error) => {
          this.loading = false;

        }
      );
    }


  }

  async deleteMonth(month: Months) {
    this.httpService.deleteAuth(month.url + '').subscribe(
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
