import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts?: Post [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.httpService.getAuth('posts').subscribe(
      (data:any)=>{
        console.log(data);
        this.posts = data.results as Post [];
      },
      (error)=>{
        console.log(error);
      }
      )
  }
}
