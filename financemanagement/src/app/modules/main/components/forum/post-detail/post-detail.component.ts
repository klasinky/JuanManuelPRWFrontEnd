import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { ColorService } from 'src/app/services/color.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
/**
 * Componente para el Detalle del post
 */
export class PostDetailComponent implements OnInit {
  /**
   * Objeto del post
   */
  post?: Post;
  /**
   * Lista de los post recomendados
   */
  postRecommendation?: Post[];
  /**
   * ID del post
   */
  id: number = 0;
  /**
   * Indica si se muestra el spinner del like
   */
  showLikeLoader: boolean = false;
  /**
   * Indica si se muesra el spinner de eliminar
   */
  showDeleteLoader: boolean = false;
  /**
   * Indica si se muesra el skeleton
   */
  loading: boolean = true;
  /**
   * Indica si se muestra el skeleton de la lista de recomendaciones
   */
  loadingRecommendation: boolean = true;
  /**
   * Cantidad de número Post recomendados (Para el skeleton)
   */
  numberPagination: number[];

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private colorService: ColorService) { 
      this.numberPagination = Array(3).fill(0).map((x, i) => i);
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        // this.id = JSON.parse(unescape(atob(params.id)));
        this.id = params.id;
        this.getPost();
        this.getPostRecommendation();
      } catch (error) {
        this.router.navigate(['dashboard']).then(() => {
          // Notificación
          this.toastr.error('Ha ocurrido un error', 'Error');
        })
      }
    });
  }
  /**
   * Obtiene el post
   */
  getPost() {
    this.loadingRecommendation = true;
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

  /**
   * Obtiene la lista de post recomendados
   */
  getPostRecommendation() {
    this.loadingRecommendation = true;
    const url = 'posts/' + this.id+"/recommendation";
    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.postRecommendation = data as Post [];
        this.loadingRecommendation = false;

      },
      (error) => {
        this.loadingRecommendation = false;
        this.toastr.error('Error')
      }
    )
  }
  /**
   * Envia un like al post
   */
  sendLike() {
    this.showLikeLoader = true;
    const url = 'posts/' + this.id + "/like";
    this.httpService.putAuth(url).subscribe(
      (data: any) => {
        if (this.post) {
          this.post.likes = data.likes as number;
          this.post.is_like = data.is_like as boolean;
        }
        this.showLikeLoader = false;
      },
      (error) => {
        this.toastr.error(error.error.detail)
        this.showLikeLoader = false;

      }
    )
  }
  /**
   * Elimina el post
   */
  deletePostAction() {
    this.showDeleteLoader = true;
    const url: string = environment.endpoints.posts.viewset;
    this.httpService.deleteAuth(url, this.post?.id).subscribe(
      (data: any) => {
        this.router.navigate(['dashboard/post']).then(() => {
          // Notificación
          this.toastr.success('El post ha sido eliminado.')
          this.showDeleteLoader = false;
        })
      },
      (error) => {
        this.showDeleteLoader = false;
      }
    )
  }
  /**
   * Obtiene el estilo 
   */
  getStyle() {
    return this.colorService.getColor(this.post?.author?.username);
  }
}
