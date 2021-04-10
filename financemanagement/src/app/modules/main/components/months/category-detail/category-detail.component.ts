import { Component, Input, OnInit } from '@angular/core';
import { AmountBase } from 'src/app/interfaces/amount-base';
import { Category, CategoryDetail } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  @Input() category?: CategoryDetail;
  @Input() isExpense?: boolean; // false = Entry , True = Expense
  serviceName?: string;
  category_data?: AmountBase[];

  constructor() { }

  ngOnInit(): void {
    this.serviceName = (this.isExpense) ? "expenses" : "entries";
    this.category_data = (this.isExpense) ? 
    this.category?.category_data.expenses : 
    this.category?.category_data.entries;
  }

}
