import { Component, Input, OnInit } from '@angular/core';
import { Months } from 'src/app/interfaces/months';
import { Overview } from 'src/app/interfaces/overview';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {

  detail?: Overview;

  differenceError: boolean = false;


  //Filters
  btnAll: boolean = false;
  btnMonth: boolean = false;
  btnYear: boolean = false;

  btnAllLoading: boolean = false;
  btnMonthLoading: boolean = false;
  btnYearLoading: boolean = false;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getDifferenceColor() {
    if (this.detail?.total_difference)
      this.differenceError = this.detail.total_difference <= 0;
  }

  getTotal(filter = "?q=all") {
    this.setActiveButton(filter)

    this.httpService.getAuth('months/overview' + filter).subscribe(
      (data) => {
        this.detail = data as Overview;
        this.detail.total_difference = this.detail.total_entries - this.detail.total_expenses;
        this.getDifferenceColor();
        this.clearLoadingButtons();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  setActiveButton(filter: string) {
    this.btnAll = false;
    this.btnMonth = false;
    this.btnYear = false;

    if (filter == '?q=all') {
      this.btnAll = true;
      this.btnAllLoading = true;
    } else if (filter == '?q=year') {
      this.btnYear = true;
      this.btnYearLoading = true;

    } else if (filter == '?q=month') {
      this.btnMonth = true;
      this.btnMonthLoading = true;

    }
  }

  clearLoadingButtons(){
    this.btnAllLoading = false;
    this.btnYearLoading = false;
    this.btnMonthLoading = false;

  }
}
