import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { UserProfile } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss', './tags-detail/tags-detail.component.scss']
})
/**
 * Componente del foro
 */
export class ForumComponent implements OnInit {
  /**
   * Lista de post
   */
  posts?: Post[];
  /**
   * Lista del TOP de usuarios
   */
  topUsers?: UserProfile[];
  /**
   * Número del total de posts
   */
  totalPosts?: number;
  /**
   * URL de la paginación
   */
  nextUrl?: string;
  /**
   * URL de la paginación
   */
  previousUrl?: string;
  /**
   * Número de skeletons que se van a mostrar
   */
  numberPagination: number[];
  /**
   * Indica si se muestra el skeleton
   */
  loading: boolean = false;
  /**
   * Indica si se muestra el spinner en el componente del TOP de usuarios
   */
  loadingTopUser: boolean = true;
  /**
   * ID del tag para los filtros
   */
  tagId: number;

  //Filters para los posts, si están en TRUE, hacen la petición
  // a la API con los parámetros correspondientes.

  btnAll: boolean = false;
  btnHot: boolean = false;
  btnTop: boolean = false;

  // Spinners para los botones de los fitros
  btnAllLoading: boolean = false;
  btnHotLoading: boolean = false;
  btnTopLoading: boolean = false;

  /**
   * Checkbox para ver los post de tus seguidos
   */
  cbFollowing: boolean = false;


  constructor(private httpService: HttpService,
    private route: ActivatedRoute) {
    this.numberPagination = Array(10).fill(0).map((x, i) => i);
    this.tagId = 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.tagId = queryParams['tag'];
      this.getPosts();
    });
    this.getPosts();
    this.getTopUsers();
  }
  /**
   * Obtiene la lista de posts 
   */
  getPosts(filter = "") {
    this.setActiveButton(filter);
    if (this.cbFollowing == true) {
      const following = (filter !== "") ? "&followers=true" : "?followers=true";
      filter += following;
    }
    if (this.tagId !== undefined) {
      const tag = (filter !== "") ? `&tag=${this.tagId}` : `?tag=${this.tagId}`
      filter += tag;
    }
    const url: string = environment.endpoints.posts.create + filter;

    this.loading = true;


    this.httpService.getAuth(url).subscribe(
      (data: any) => {
        this.loading = false;
        this.totalPosts = data.count;
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        this.posts = data.results as Post[];
        this.clearLoadingButtons();
      },
      (error) => {
        this.loading = false;
      }
    )
  }
  /**
   * Obtiene el TOP de usuarios
   */
  getTopUsers() {
    const url = 'users/tops';
    this.loadingTopUser = true;

    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.topUsers = data as UserProfile[];
        this.loadingTopUser = false;
      },
      (error) => {
        this.loadingTopUser = false;

      }
    )
  }
  /**
   * Te lleva a la siguiente página de la paginación
   * @param isNext {boolean} cambia la URL 
   */
  changeUrl(isNext: boolean) {
    const url = isNext ? this.nextUrl : this.previousUrl;
    if (url) {
      this.loading = true;
      this.httpService.getAuth(url, true).subscribe(
        (data: any) => {
          this.loading = false;
          this.totalPosts = data.count;
          this.nextUrl = data.next;
          this.previousUrl = data.previous;
          this.posts = data.results as Post[];
          this.clearLoadingButtons();
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }
  /**
   * Activa el filtro para listar los posts de los seguidos
   */
  changeCbFollowing() {
    this.cbFollowing = !this.cbFollowing;
    this.getPosts();
  }
  /**
   * Activa el botón según el filtro
   * @param filter 
   */
  setActiveButton(filter: string) {
    this.btnAll = false;
    this.btnHot = false;
    this.btnTop = false;

    if (filter == '') {
      this.btnAll = true;
      this.btnAllLoading = true;
    } else if (filter == '?sort=hot') {
      this.btnHot = true;
      this.btnHotLoading = true;

    } else if (filter == '?sort=top') {
      this.btnTop = true;
      this.btnTopLoading = true;
    }
  }
  /**
   * Limpia los spinners de los botones
   */
  clearLoadingButtons() {
    this.btnAllLoading = false;
    this.btnHotLoading = false;
    this.btnTopLoading = false;
  }
  /**
   * Obtiene los estilos del skeleton
   */
  getStyle() {
    return {
      'background': '#42141E',
      'border-radius': '0',
      'height': '85px',
      'margin-bottom': '0',
      'box-shadow': '2px 20px 30px #42141E',

    }
  }
}
