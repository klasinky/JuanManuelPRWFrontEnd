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
   * Guard para saber si el usuario está autenticado
   */
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.httpService.getAuth('currencies').subscribe(
        (res) => {
          resolve(false);
          this.router.navigate(['dashboard']);
        },
        (error) => {
          
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
