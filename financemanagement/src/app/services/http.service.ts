import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth=constant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient,
    private storageService: StorageService) {
 

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

  getAuth(serviceName: string, token?:string) {
    let headers = this.getHeaders();
    if (token) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      });
    }
        
    const url = environment.apiUrl + "/" + serviceName;
    return this.http.get(url, { headers: headers })

  }

  postAuth(serviceName: string, data = {}) {
  

    const url = environment.apiUrl + "/" + serviceName;
    return this.http.post(url, data, { headers: this.getHeaders()})

  }

  getHeaders():HttpHeaders{
    let token = this.storageService.getWithoutAsync(AuthConstants.AUTH)

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
  }
}
