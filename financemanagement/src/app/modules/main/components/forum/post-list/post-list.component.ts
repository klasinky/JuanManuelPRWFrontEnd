import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
/**
 * Componente para la lista de post
 */
export class PostListComponent implements OnInit {
  /**
   * Objeto del post
   */
  @Input() post!: Post;
  /**
   * Emitter para refrescar el componente padre
   */
  @Output() refreshPosts: EventEmitter<any> = new EventEmitter();
  /**
   * Indica si se muestra el spinner del like
   */
  showLikeLoader: boolean = false;
  /**
   * Indica si se muestra el spinner del delete
   */
  showDeleteLoader: boolean = false;
  /**
   * Indica si se muestra el skeleton
   */
  loading: boolean = true;

  constructor(private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  /**
   * Envía un like al post 
   */
  sendLike() {
    this.showLikeLoader = true;
    const url = 'posts/' + this.post?.id + "/like";
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
   * Elimina un post
   */
  deletePostAction(){
    this.showDeleteLoader = true;
    const url: string = environment.endpoints.posts.viewset;
    this.httpService.deleteAuth(url, this.post?.id).subscribe(
      (data: any) => {
        this.toastr.success("El post ha sido eliminado.");
        this.refreshPosts.emit();
        this.showDeleteLoader = false;
      },
      (error) => {
        this.showDeleteLoader = false;
      }
    )
  }


}
