import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    /**
     * Loguea al usuario
     * @param data {Login}
     */
    login(data:Login): Observable<any>{
      return this.httpService.post(environment.endpoints.auth.login, data);
    }
    /**
     * Registra a un usuario
     * @param data {any}
     */
    register(data:any):Observable<any>{
      return this.httpService.post(environment.endpoints.auth.register, data);
    }
    /**
     * Cierra sesión 
     */
    logout(){
      this.storageService.clear();
      this.router.navigate(['auth']);
    }
}
