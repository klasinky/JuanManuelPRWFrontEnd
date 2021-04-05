import { Component, OnInit } from '@angular/core';
import { Months } from 'src/app/interfaces/months';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {

  months!: Months[];
  // months = [
  //   {
  //     date: "2021/03",
  //     total_entries: 200,
  //     total_expenses: 300
  //   },
  //   {
  //     date: "2021/04",
  //     total_entries: 200,
  //     total_expenses: 300
  //   },
  //   {
  //     date: "2021/05",
  //     total_entries: 200,
  //     total_expenses: 300
  //   },
  //   {
  //     date: "2021/06",
  //     total_entries: 200,
  //     total_expenses: 300
  //   },
  //   {
  //     date: "2021/07",
  //     total_entries: 200,
  //     total_expenses: 300
  //   },
  // ]

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getMonths()
  }

  getMonths(){
    this.httpService.getAuth('months/all').subscribe(
      (data:any)=>{
        this.months = data.results as Months[];        
      },
      (error)=>{
        console.log("ERROR ");
        console.log(error);

      }
    )
  }
}
