import { Component, OnInit } from '@angular/core';
import { TagDetail } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tags-detail',
  templateUrl: './tags-detail.component.html',
  styleUrls: ['./tags-detail.component.scss']
})
export class TagsDetailComponent implements OnInit {

  tags?: TagDetail[];
  numberSkeleton: number[]

  constructor(private httpService: HttpService) {
    this.numberSkeleton = Array(5).fill(0).map((x, i) => i);

   }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.httpService.getAuth('tags/detail').subscribe(
      (data) => {
        this.tags = data as TagDetail[];
      }, (error) => {
        console.log(error);
      }
    )
  }
}
