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
/**
 * Componente del mes
 */
export class MonthsComponent implements OnInit {
  /**
   * Total de meses
   */
  totalMonths?: number;
  /**
   * URL de la paginación
   */
  nextUrl?: string;
  /**
   * URL de la paginación
   */
  previousUrl?: string;
  /**
   * Lista de meses
   */
  months!: Months[];
  /**
   * Indicia si se muestra el skeleton
   */
  loading: boolean = false;
  /**
   * Número de skeleton que se van a mostrar
   */
  numberPagination: number[];

  constructor(private httpService: HttpService,
    private toastr: ToastrService) {
    this.numberPagination = Array(12).fill(0).map((x, i) => i);
  }


  ngOnInit(): void {
    this.getMonths()
  }

  /**
   * Obtener una lista de todos los meses del usuario
   */
  async getMonths() {
    const url: string = environment.endpoints.months.all;
    this.loading = true;

    this.httpService.getAuth(url).subscribe(
      (data: any) => {
        this.loading = false;
        this.totalMonths = data.count;
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        this.months = data.results as Months[];
      },
      (error) => {
        this.loading = false;
      }
    )
  }


  /**
   * Obtener la nueva pagina de meses
   * @param isNext true = siguiente pagina, false = pagina actual
   */
  changeUrl(isNext: boolean) {
    const url = isNext ? this.nextUrl : this.previousUrl;
    if (url) {
      this.loading = true;
      this.httpService.getAuth(url, true).subscribe(
        (data: any) => {
          this.loading = false;
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

  /**
   * Eliminar un mes
   * @param month mes
   */
  async deleteMonth(month: Months) {
    const url: string = environment.endpoints.months.viewset;
    this.httpService.deleteAuth(url, month.id).subscribe(
      (data: any) => {
        this.months.splice(this.months.indexOf(month), 1);
        this.toastr.success('Has eliminado el mes correctamente', 'Mes eliminado');
      },
      (error) => {
        this.toastr.error(error.detail, "Ha ocurrido un error");
      }
    )
  }

  /**
   * Añade un mes a la variable months
   * @param _month mes
   */
  addMonth(_month: Months): void {
    this.months.unshift(_month);
  }
}
