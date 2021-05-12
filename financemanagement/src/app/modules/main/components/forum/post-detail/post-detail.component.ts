import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { ColorService } from 'src/app/services/color.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post?: Post;
  id: number = 0;
  showLikeLoader: boolean = false;
  loading: boolean = true;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        // this.id = JSON.parse(unescape(atob(params.id)));
        this.id = params.id;
        this.getPost();
      } catch (error) {
        this.router.navigate(['dashboard']).then(() => {
          // Notificación
          this.toastr.error('Ha ocurrido un error', 'Error');
        })
      }
    });
  }

  getPost() {
    this.loading = true;
    const url = 'posts/' + this.id;
    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.post = data as Post;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastr.error('Error')
      }
    )

  }

  sendLike() {
    this.showLikeLoader = true;
    const url = 'posts/' + this.id + "/like";
    this.httpService.putAuth(url).subscribe(
      (data: any) => {
        console.log(data)
        if (this.post) {
          this.post.likes = data.likes as number;
          this.post.is_like = data.is_like as boolean;
          console.log("Is Like " + this.post.is_like)
        }
        this.showLikeLoader = false;

      },
      (error) => {
        this.toastr.error(error.error.detail)
        this.showLikeLoader = false;

      }
    )
  }

  getStyle(){
    return this.colorService.getColor(this.post?.author?.username);
  }
}
