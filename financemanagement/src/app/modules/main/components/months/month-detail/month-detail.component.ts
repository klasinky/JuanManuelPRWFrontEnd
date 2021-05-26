import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { MonthDetail } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';
import { MonthDetailService } from 'src/app/services/month-detail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-month-detail',
  templateUrl: './month-detail.component.html',
  styleUrls: ['./month-detail.component.scss']
})
export class MonthDetailComponent implements OnInit, OnDestroy {

  month?: MonthDetail;
  id: number = 0;
  categories?: Category [];
  refreshSubscription?: Subscription;
  visibleSidebar5: any;

  constructor(private monthService: MonthDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        this.id = JSON.parse(unescape(atob(params.id)));
        this.getMonth(this.id);
        this.getCategoriesAction();
      } catch (error) {
        this.router.navigate(['dashboard']).then(() => {
          // Notificación
          this.toastr.error('Ha ocurrido un error', 'Error');
        })
      }
    });
    this.refreshSubscription = this.monthService.refresh$.subscribe(() => {
      this.refreshMonth();
    })
  }

  /**
   * Obtiene la información del mes
   * @param id id del mes
   */
  getMonth(id: number) {
    this.monthService.getMonth(id).subscribe(
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


   /**
   * Obtener todas las categorias
   */
  getCategoriesAction() {

    this.monthService.getCategoriesAll().subscribe(
      (data: any) => {
        this.categories = data;
      }, (error) => {
        console.log(error.error.detail);
      }
    )
  }

  refreshMonth() {
    this.getMonth(this.id);
  }

  ngOnDestroy(){
    this.refreshSubscription?.unsubscribe();
  }
}
