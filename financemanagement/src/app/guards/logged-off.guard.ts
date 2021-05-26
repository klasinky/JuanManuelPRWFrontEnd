import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/auth=constant';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOffGuard implements CanActivate {

  /**
   * Boolean para mostrar el spinner de carga
   */
  public loader = true;

    /**
   * Guard (Se activa en el module MAIN), evita que el usuario
   * ingrese al módulo MAIN si no está autenticado
   */
  canActivate(): Promise<boolean> {
    this.loader = true;
    return new Promise(resolve => {
      this.httpService.getAuth('users/check').subscribe(

        (res) => {
          resolve(true);
          this.loader = false;
        },
        (error) => {


          this.router.navigate(['auth']).then(() => {
            this.loader = false;
          })
          resolve(false);
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
