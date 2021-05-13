import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentPost } from 'src/app/interfaces/comment';
import { ColorService } from 'src/app/services/color.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-comment-detail',
  templateUrl: './post-comment-detail.component.html',
  styleUrls: ['./post-comment-detail.component.scss']
})
export class PostCommentDetailComponent implements OnInit {

  @Input() comment?: CommentPost;
  @Output() refreshComments: EventEmitter<any> = new EventEmitter();

  showDeleteLoader: boolean = false;
  showLikeLoader: boolean = false;

  constructor(private httpService: HttpService,
    private toastr: ToastrService,
    private colorService: ColorService) { }

  ngOnInit(): void {
  }

  getStyle() {
    return this.colorService.getColor(this.comment?.author.username);
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

  deleteCommentAction() {
    const url: string = environment.apiUrl + "/" + environment.endpoints.comments.delete.start +
      this.comment?.id + environment.endpoints.comments.delete.end;
    this.showDeleteLoader = true;

    this.httpService.deleteAuth(url).subscribe(
      (data: any) => {
        this.refreshComments.emit();
        this.toastr.success("Se ha eliminado el comentario correctamente.")
        this.showDeleteLoader = false;
      },
      (error: any) => {
        this.showDeleteLoader = false;
      }
    )
  }
}
