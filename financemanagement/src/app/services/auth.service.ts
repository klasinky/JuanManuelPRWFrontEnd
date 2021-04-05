import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
    ) { }

    login(data:Login): Observable<any>{
      return this.httpService.post('users/login', data);
    }

    register(data:any):Observable<any>{
      return this.httpService.post('users/register', data);
    }

    logout(){
      this.storageService.clear()
      .then(res=>{
        this.router.navigate(['auth']);
      })
    }
}
