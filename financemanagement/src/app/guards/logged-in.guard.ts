import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/auth=constant';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  /**
   * Boolean para mostrar el spinner de carga
   */
  public loader = true;

  /**
   * Guard (Se activa en el module AUTH), evita que el usuario
   * ingrese al módulo AUTH si está autenticado
   */
  canActivate(): Promise<boolean> {

    this.loader = true;
    return new Promise(resolve => {
      this.httpService.getAuth('users/check').subscribe(
        (res) => {
          resolve(false);

          this.router.navigate(['dashboard']).then(() => {
            this.loader = false;
          })
        },
        (error) => {
          this.loader = false;
          resolve(true);
        }
      )

    });
  }
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router) {

  }
}
