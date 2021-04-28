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
   * Guard para saber si el usuario esta deslogeado
   */
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.httpService.getAuth('currencies').subscribe(
        (res) => {
          resolve(true);
        },
        (error) => {

          this.router.navigate(['auth']);
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
