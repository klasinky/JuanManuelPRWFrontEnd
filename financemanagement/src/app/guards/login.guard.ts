import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth=constant';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
        .get(AuthConstants.AUTH)
        .then(res => {
          if (res) {
            this.router.navigate(['']);
            resolve(false);
          } else {
            resolve(true);
           
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  }
  constructor(private storageService: StorageService, private router: Router) {

  }
  
}
