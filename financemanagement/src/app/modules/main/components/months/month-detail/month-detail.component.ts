import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MonthDetail, Months } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-month-detail',
  templateUrl: './month-detail.component.html',
  styleUrls: ['./month-detail.component.scss']
})
export class MonthDetailComponent implements OnInit {
  month?: MonthDetail;
  id:number = 0;
  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { 

    }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        try {
          this.id = JSON.parse(unescape(atob(params.id)));
          this.getMonth(this.id);
        } catch (error) {
          this.router.navigate(['dashboard']).then(() => {
            // Notificación
            this.toastr.error('Ha ocurrido un error', 'Error');
          })
        }
      });
  };

  getMonth(id:number) {
    this.httpService.getAuth('months/' + id).subscribe(
      (data: any) => {
        this.month = data;
      },
      (error) => {
        this.router.navigate(['dashboard']).then(() => {
          // Notificación
          this.toastr.error('Mes ' + error.error.detail.toLowerCase(), 'Error')
        })
      }
    )
  }

  refreshMonth(_event:any){
    this.getMonth(this.id);
  }

}
