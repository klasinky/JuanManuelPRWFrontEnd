import { Component, Input, OnInit } from '@angular/core';
import { MonthDetail } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';
import { Analysis } from '../../../../../interfaces/analysis';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  @Input() month?: MonthDetail;
  analysis? : Analysis;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAnalysis();
  }

  getAnalysis() {
    const url = 'months/'+this.month?.month.id+"/analysis";
    this.httpService.getAuth(url).subscribe(
      (data)=>{
        this.analysis = data as Analysis;
        console.log(this.analysis);
      },
      (error)=>{

      }
    )
  }
}
