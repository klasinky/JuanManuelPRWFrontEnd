import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/interfaces/user';
import { ColorService } from 'src/app/services/color.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-top-contributors',
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.scss',
   '../tags-detail/tags-detail.component.scss']
})
/**
 * Componente para mostrar el Top de Usuarios
 */
export class TopContributorsComponent implements OnInit {
  /**
   * Objeto del usuario
   */
  @Input()user?: UserProfile;
  /**
   * Indicia si se muestra el spinner
   */
  loadingFollow = false;

  constructor(private httpService: HttpService,
    private toastr: ToastrService,
    private colorService: ColorService) { }

  ngOnInit(): void {
  }
  /**
   * Envía una petición para comenzar / dejar de seguir al usuario
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
  /**
   * Obtiene los estilos del usuario que no tiene foto de perfil
   */
  getStyle() {
    return this.colorService.getColor(this.user?.username);
  }

}
