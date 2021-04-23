import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

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

  downloadXLS() {
    const serviceName = 'months/' + this.idMonth + '/export/' + this.serviceName;
    this.showUploadProgress = true;
    this.httpService.getXmlDownload(serviceName).subscribe(
      (data: any) => {
        
        if (data.type == 3) {
          console.log("From datatype ", data)
          this.uploadProgress = Math.round((data.loaded * 100) / data.total);

        }
        if(data?.body){
          console.log("DESDE EL BODY")
          console.log(data)
          const blob = new Blob([data.body], { type: 'application/vnd.ms-excel' });
          const file = new File([blob], 'report.xlsx', { type: 'application/vnd.ms-excel' });
          const url = window.URL.createObjectURL(file);
          // const a = document.createElement("a");
          // document.body.appendChild(a);
          // a.download = file?.name;
          window.open(url);
          // a.href = url;
          // a.click();
          // console.log(a)
          window.URL.revokeObjectURL(url);
        }
        

      }, (error) => {
        console.log("From error ", error)

        this.showUploadProgress = false;
        this.uploadProgress = 0;

      }
    )
  }




}
