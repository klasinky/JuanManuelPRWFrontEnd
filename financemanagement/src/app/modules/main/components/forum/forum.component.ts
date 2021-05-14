import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts?: Post[];
  totalPosts?: number;
  nextUrl?: string;
  previousUrl?: string;
  numberPagination: number[];
  loading: boolean = false;

  //Filters
  btnAll: boolean = false;
  btnHot: boolean = false;
  btnTop: boolean = false;

  btnAllLoading: boolean = false;
  btnHotLoading: boolean = false;
  btnTopLoading: boolean = false;

  constructor(private httpService: HttpService) {
    this.numberPagination = Array(10).fill(0).map((x, i) => i);
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(filter = "") {
    this.setActiveButton(filter);
    const url: string = environment.endpoints.posts.create + filter;
    this.loading = true;

    this.httpService.getAuth(url).subscribe(
      (data: any) => {
        this.loading = false;
        this.totalPosts = data.count;
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        this.posts = data.results as Post[];
        this.clearLoadingButtons();
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    )
  }

  changeUrl(isNext: boolean) {
    const url = isNext ? this.nextUrl : this.previousUrl;
    if (url) {
      this.loading = true;
      this.httpService.getAuth(url, true).subscribe(
        (data: any) => {
          this.loading = false;
          this.totalPosts = data.count;
          this.nextUrl = data.next;
          this.previousUrl = data.previous;
          this.posts = data.results as Post[];
          this.clearLoadingButtons();
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }

  setActiveButton(filter: string) {
    this.btnAll = false;
    this.btnHot = false;
    this.btnTop = false;

    if (filter == '') {
      this.btnAll = true;
      this.btnAllLoading = true;
    } else if (filter == '?sort=hot') {
      this.btnHot = true;
      this.btnHotLoading = true;

    } else if (filter == '?sort=top') {
      this.btnTop = true;
      this.btnTopLoading = true;
    }
  }

  clearLoadingButtons() {
    this.btnAllLoading = false;
    this.btnHotLoading = false;
    this.btnTopLoading = false;
  }

  getStyle() {
    return {
      'background': '#42141E',
      'border-radius': '0',
      'height': '85px',
      'margin-bottom': '0',
      'box-shadow': '2px 20px 30px #42141E',

    }
  }
}
