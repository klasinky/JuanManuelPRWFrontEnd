import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Months } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boton-crear',
  templateUrl: './boton-crear.component.html',
  styleUrls: ['./boton-crear.component.scss']
})
export class BotonCrearComponent implements OnInit {

  @Output() newMonth: EventEmitter<Months> = new EventEmitter();

  showLoader = false;


  constructor(private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addMonth() {
    const url: string = environment.endpoints.months.create;
    this.showLoader = true;
    
    this.httpService.postAuth(url).subscribe(
      (data: any) => {
        const month = data as Months;
        this.toastr.success('¡Has creado un mes!', 'Mes creado');
        this.newMonth.emit(month);
        this.showLoader = false;

      }, (error) => {
        console.log(error.error.detail);
        this.toastr.error(error.error.detail, 'Error al crear mes');
        this.showLoader = false;

      }
    )
  }
}
