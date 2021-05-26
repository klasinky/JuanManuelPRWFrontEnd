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
/**
 * Componente para crear / editar post
 */
export class CreatePostComponent implements OnInit {

  /**
   * Texto del post
   */
  text: string = "";
  /**
   * Título del post
   */
  title: string = "";
  /**
   * Tags del post (Si se está editando)
   */
  postTags?: Tag[];
  /**
   * Lista de todos los tags
   */
  tags?: Tag[];
  /**
   * ID del post
   */
  id?: number;
  /**
   * Boolean para indicar si se edita o crea el post
   */
  isCreate: boolean = true;
  /**
   * Boolean para mostrar el spinner de carga
   */
  loading: boolean = false;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
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
  /**
   * Crea / Edita un post
   */
  createPost() {
    if (this.checkPost()) {
      this.loading = true;
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
          this.loading = false;

        }, (error) => {
          this.loading = false;

          this.toastr.error(error.error.detail, 'Error')
        }
      )
    }
  }

  /**
   * Obtiene el post (Si se va a editar)
   */
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

  /**
   * Redirecciona a la lista de posts 
   */
  redirectToDashboard() {
    this.router.navigate(['dashboard/post']).then(() => {
      // Notificación
      this.toastr.error('Ha ocurrido un error', 'Error');
    })
  }

  /**
   * Valida el post
   */
  checkPost(): boolean {
    return this.text.length > 10 && this.text.length < 5000000
      && this.title.length > 3 && this.title.length < 255;
  }

  /**
   * Obtiene todos los tags
   */
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

  /**
   * Obtiene los tags del post
   */
  getPostTags() {
    this.tags?.forEach(tag => {
      if (this.postTags?.find(tagPost => tag.id == tagPost.id)) {
        tag.checked = true;
      }
    })
  }
}
