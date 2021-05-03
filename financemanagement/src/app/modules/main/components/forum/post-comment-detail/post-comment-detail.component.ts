import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentPost } from 'src/app/interfaces/comment';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post-comment-detail',
  templateUrl: './post-comment-detail.component.html',
  styleUrls: ['./post-comment-detail.component.scss']
})
export class PostCommentDetailComponent implements OnInit {

  @Input() comment?: CommentPost;
  showLikeLoader: boolean = false;
  constructor(private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendLike() {
    if (this.comment) {
      this.showLikeLoader = true;
      const url = this.comment.url_like;
      if (url) {
        this.httpService.putAuth(url, {}, true).subscribe(
          (data: any) => {
            if (this.comment) {
              this.comment.is_like = data.is_like as boolean;
              this.comment.likes = data.likes as number;
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
  }
}
