import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-amount-base',
  templateUrl: './download-amount-base.component.html',
  styleUrls: ['./download-amount-base.component.scss']
})
export class DownloadAmountBaseComponent implements OnInit {

  @Input() isExpense?: boolean;
  title?: string;
  serviceName?: string;
  idMonth?: number;

  //ProgressBar
  uploadProgress: number = 0;
  showUploadProgress: boolean = false;
  
  constructor(private httpService: HttpService,
    private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.title = (this.isExpense) ? "Gasto" : "Ingreso";
    this.serviceName = (this.isExpense) ? "expense" : "entry";
    this.route.params.subscribe(params => {
      this.idMonth = JSON.parse(unescape(atob(params.id)));
    })
  }

  /**
   * Descarga el XLS con toda la información de gastos o ingresos (serviceName) del mes
   */
  downloadXLS() {
    const url: string = environment.endpoints.amountBase.export.start +
      this.idMonth + environment.endpoints.amountBase.export.end + this.serviceName;

    this.showUploadProgress = true;
    this.uploadProgress = 0;

    this.httpService.getXmlDownload(url).subscribe(
      (data: any) => {

        if (data.type == 3) {
          this.uploadProgress = Math.round((data.loaded * 100) / data.total);
        }
        if (data?.body) {
          const blob = new Blob([data.body], { type: 'application/vnd.ms-excel' });
          const file = new File([blob], 'report.xlsx', { type: 'application/vnd.ms-excel' });
          const url = window.URL.createObjectURL(file);
          window.open(url);
          window.URL.revokeObjectURL(url);
          this.showUploadProgress = false;
          this.toastr.success("Se ha descargado tu reporte", 'Descarga con éxito')
        }
      }, (error) => {
        this.showUploadProgress = false;
        this.uploadProgress = 0;
      }
    )
  }

}
