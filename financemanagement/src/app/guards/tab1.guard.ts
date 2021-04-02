import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/auth=constant';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class Tab1Guard implements CanActivate {

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
        .get(AuthConstants.AUTH)
        .then(res => {
          if (res) {
            resolve(true);
          } else {
            this.router.navigate(['welcome']);
            resolve(false);
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
