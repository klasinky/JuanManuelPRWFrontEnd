import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post?: Post; 
  id: number = 0;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

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

  getPost(){
    const url = 'posts/'+this.id;
    this.httpService.getAuth(url).subscribe(
      (data)=>{
        this.post = data as Post;
      },
      (error)=>{
        this.toastr.error('Error')
      }
    )

  }

  sendLike(){
    const url = 'posts/'+this.id+"/like";
    this.httpService.putAuth(url).subscribe(
      (data: Post)=>{
        if(this.post?.likes){
          this.post.likes = data.likes as number;
        }
      },
      (error)=>{        
        this.toastr.error(error.error.detail)
      }
    )
  }
}
