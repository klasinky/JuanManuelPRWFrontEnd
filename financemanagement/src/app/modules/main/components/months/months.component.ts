import { Component, OnInit } from '@angular/core';
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

  constructor(private httpService: HttpService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getMonths()
  }

  async getMonths() {
    this.httpService.getAuth('months/all').subscribe(
      (data: any) => {
        this.months = data.results as Months[];
      },
      (error) => {
        console.log("ERROR ");
        console.log(error);

      }
    )
  }

  addMonth(_month: Months): void {
    this.months.unshift(_month);
  }
}
