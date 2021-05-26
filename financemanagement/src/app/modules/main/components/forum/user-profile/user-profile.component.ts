import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/interfaces/post';
import { UserProfile } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
/**
 * Componente para el perfil del usuario
 */
export class UserProfileComponent implements OnInit {

  /**
   * Lista de posts del usuario
   */
  posts?: Post[];
  /**
   * Username 
   */
  username?: string;

  // Pagination
  /**
   * Número de post en Total
   */
  totalPosts?: number;
  /**
   * URL para la paginación
   */
  nextUrl?: string;
  /**
   * URL para la paginación
   */
  previousUrl?: string;
  /**
   * Número de skeletons que se van a mostrar
   */
  numberPagination: number[];

  // Loading Skeleton
  loading: boolean = false;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.numberPagination = Array(9).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      try {
        const username = params.username;
        this.username = username;
        let title = this.titleService.getTitle();
        this.titleService.setTitle(title + " - " + this.username);
        this.getPostUser();
      } catch (error) {
        this.router.navigate(['dashboard']).then(() => {
          // Notificación
          this.toastr.error('Ha ocurrido un error', 'Error');
        })
      }
    });

  }

  /**
   * Obtener todos los post del usuario
   */
  getPostUser() {
    const url: string = environment.endpoints.posts.create + "/filter/" + this.username;
    this.loading = true;
    console.log("Entre al get posts user")
    this.httpService.getAuth(url).subscribe(
      (data: any) => {
        this.loading = false;
        this.totalPosts = data.count;
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        this.posts = data.results as Post[];

      },
      (error) => {
        this.loading = false;
      }
    )
  }

  /**
   * Obtener la nueva pagina de posts
   * @param isNext true = siguiente pagina, false = pagina actual
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
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }
}
