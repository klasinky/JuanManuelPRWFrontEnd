import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
/**
 * Componente para el CARD del usuario en el perfil
 */
export class UserCardComponent implements OnInit {
  /**
   * Username del usuario
   */
  @Input() username?: string;
  /**
   * Datos del usuario
   */
  user?: UserProfile;
  /**
   * Indica si se muestra el spinner
   */
  loadingFollow = false;
  /**
   * Indica si se muestra el skeleton
   */
  loading = true;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getInfoProfile(this.username + "");
  }

  /**
   * Obtiene la información del usuario
   */
  getInfoProfile(username: string) {
    const url: string = "users/profile/" + username;
    this.loading = true;
    this.httpService.getAuth(url).subscribe(
      (data: any) => {
        this.loading = false;
        this.user = data as UserProfile;
      },
      (error: any) => {
        this.loading = true;
        this.router.navigate(['dashboard/post']).then(() => {
          // Notificación
          this.toastr.error('El usuario no existe 😢', 'Error');
        })
      }
    )
  }
  /**
   * Sigue al usuario
   */
  follow() {
    const url: string = "users/profile/" + this.user?.username;
    this.loadingFollow = true;
    this.httpService.patchAuth(url).subscribe(
      (data: any) => {
        this.loadingFollow = false;
        this.user = data as UserProfile;
        let msg = "Has dejado de seguir a este usuario";
        if (this.user.is_following) {
          msg = "Has comenzado a seguir a este usuario";
        }

        this.toastr.success(msg);
      },
      (error: any) => {
        this.loadingFollow = false;
        this.toastr.error(error.error.detail, 'Error');
      }
    )
  }
}
