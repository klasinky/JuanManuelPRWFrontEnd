import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/auth=constant';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOffGuard implements CanActivate {

  public loader = true;

  /**
   * Guard para saber si el usuario esta deslogeado
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
