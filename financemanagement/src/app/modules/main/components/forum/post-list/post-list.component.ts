import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { ColorService } from 'src/app/services/color.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() post!: Post;
  showLikeLoader: boolean = false;
  loading: boolean = true;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private colorService: ColorService) { }

  ngOnInit(): void {
  }

  sendLike() {
    this.showLikeLoader = true;
    const url = 'posts/' + this.post?.id + "/like";
    this.httpService.putAuth(url).subscribe(
      (data: any) => {
        if (this.post) {
          this.post.likes = data.likes as number;
          this.post.is_like = data.is_like as boolean;
          console.log("Is Like " + this.post?.is_like)
        }
        this.showLikeLoader = false;
      },
      (error) => {
        this.toastr.error(error.error.detail)
        this.showLikeLoader = false;
      }
    )
  }


}
