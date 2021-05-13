import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  text: string = "";
  title: string = "";
  id?: number;
  isCreate: boolean = true;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        // this.id = JSON.parse(unescape(atob(params.id)));
        this.id = params.id;
        if (this.id) {
          this.getPost();
          this.isCreate = false;
        }
      } catch (error) {
        
      }
    });
  }

  createPost() {
    if (this.checkPost()) {
      const data = {
        'title': this.title,
        'description': this.text,
        'tags': []
      }
      this.httpService.postAuth('posts', data).subscribe(
        (data) => {
          this.router.navigate(['/dashboard/post']).then(() => {
            // Notificación
            this.toastr.success('Post creado')
          })
        }, (error) => {
          this.toastr.error(error.error.detail, 'Error')
        }
      )
    }else{
      console.log("Es fake")
    }
  }

  editPost(){
    if (this.checkPost()) {
      const data = {
        'title': this.title,
        'description': this.text,
        'tags': []
      };
      const url: string = environment.endpoints.posts.viewset + this.id;
      this.httpService.patchAuth(url, data).subscribe(
        (data) => {
          this.router.navigate(['/dashboard/post/',this.id]).then(() => {
            // Notificación
            this.toastr.success('El post ha sido editado correctamente.')
          })
        },
        (error) => {
          console.log(error);
          
          this.toastr.error('No se ha podido editar el post.', 'Error')
        }
      )
    }
  }

  getPost(){
    const url = 'posts/' + this.id;
    this.httpService.getAuth(url).subscribe(
      (data) => {
        let post = data as Post;
        if (post.is_owner) {
          this.title = post.title + "";
          this.text = post.description + "";
        } else {
          this.redirectToDashboard();
        }
      },
      (error) => {
        this.redirectToDashboard();
      }
    )
  }

  redirectToDashboard(){
    this.router.navigate(['dashboard/post']).then(() => {
      // Notificación
      this.toastr.error('Ha ocurrido un error', 'Error');
    })
  }

  checkPost(): boolean {
    return this.text.length > 10 && this.text.length < 5000000
      && this.title.length > 3 && this.title.length < 255;
  }

}
