import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post, Tag } from 'src/app/interfaces/post';
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
  postTags?: Tag[];
  tags?: Tag[];
  id?: number;
  isCreate: boolean = true;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        // this.id = JSON.parse(unescape(atob(params.id)));
        this.id = params.id;
        if (this.id) {
          this.getPost();
          this.isCreate = false;
        } else {
          this.getAllTags();
        }
      } catch (error) {
        this.getAllTags();
      }
    });


  }

  createPost() {
    if (this.checkPost()) {
      const tagsSelected = this.tags?.filter(tag => tag.checked == true).map(tag => tag.id);
      console.log(tagsSelected)
      const data = {
        'title': this.title,
        'description': this.text,
        'tags': tagsSelected
      }
      const url = this.isCreate ? 'posts' : environment.endpoints.posts.viewset + this.id;
      const functionName = this.isCreate ? 'postAuth' : 'patchAuth';
      this.httpService[functionName](url, data).subscribe(
        (data) => {
          if (this.isCreate) {
            this.router.navigate(['/dashboard/post']).then(() => {
              // Notificación
              this.toastr.success('Post creado')
            })
          } else {
            this.router.navigate(['/dashboard/post/', this.id]).then(() => {
              // Notificación
              this.toastr.success('El post ha sido editado correctamente.')
            })
          }

        }, (error) => {
          this.toastr.error(error.error.detail, 'Error')
        }
      )
    } else {
      console.log("Es fake")
    }
  }


  getPost() {
    const url = 'posts/' + this.id;
    this.httpService.getAuth(url).subscribe(
      (data) => {
        let post = data as Post;
        if (post.is_owner) {
          this.title = post.title + "";
          this.text = post.description + "";
          this.postTags = post.tags;
          this.getAllTags();
        } else {
          this.redirectToDashboard();
        }
      },
      (error) => {
        this.redirectToDashboard();
      }
    )
  }

  redirectToDashboard() {
    this.router.navigate(['dashboard/post']).then(() => {
      // Notificación
      this.toastr.error('Ha ocurrido un error', 'Error');
    })
  }

  checkPost(): boolean {
    return this.text.length > 10 && this.text.length < 5000000
      && this.title.length > 3 && this.title.length < 255;
  }

  getAllTags() {
    this.httpService.getAuth('tags').subscribe(
      (data) => {
        let tags = data as Tag[];
        this.tags = tags.map(x => ({ ...x, checked: false }));

        if (!this.isCreate) {
          this.getPostTags();
        }

      },
      (error) => {
        console.log(error);
      }
    )
  }

  getPostTags() {
    this.tags?.forEach(tag => {
      if (this.postTags?.find(tagPost => tag.id == tagPost.id)) {
        tag.checked = true;
      }
    })
  }
}
