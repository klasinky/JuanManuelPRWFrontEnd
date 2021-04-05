import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth=constant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers: HttpHeaders;

  constructor(private http: HttpClient,
    private storageService: StorageService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.storageService.getWithoutAsync(AuthConstants.AUTH)}`
    })
    console.log(this.storageService.getWithoutAsync(AuthConstants.AUTH));
    
  }

  post(serviceName: string, data: any = {}) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*'
    });

    const options = { header: headers, withCredentials: false };

    const url = environment.apiUrl + "/" + serviceName;

    return this.http.post(url, data, options);
  }

  getAuth(serviceName: string) {

    const url = environment.apiUrl + "/" + serviceName;

    return this.http.get(url, { headers: this.headers })

  }

  postAuth(serviceName: string, data = {}) {
    const url = environment.apiUrl + "/" + serviceName;
    return this.http.post(url, data, { headers: this.headers })

  }
}
