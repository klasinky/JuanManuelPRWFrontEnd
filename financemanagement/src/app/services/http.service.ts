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
  /**
   * Envía una petición POST sin token
   * @param serviceName {string}
   * @param data {any}
   */
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
  /**
   * Envía una petición GET con autenticación
   * @param serviceName {string}
   * @param isUrl {boolean}
   */
  getAuth(serviceName: string, isUrl: boolean = false) {
    const url = (isUrl) ? serviceName : environment.apiUrl + "/" + serviceName;
    return this.http.get(url, { headers: this.getHeaders() })
  }
  /**
   * Envía una petición DELETE con autenticación
   * @param serviceName {string}
   * @param id {number} id del objeto
   */
  deleteAuth(serviceName: string, id?: number) {
    const url = (id) ? environment.apiUrl + "/" + serviceName + id : serviceName;
    return this.http.delete(url, { headers: this.getHeaders() })
  }
  /**
   * Envía una petición POST con autenticación
   * @param serviceName {string}
   * @param data {any}
   * @param isUrl {boolean}
   */
  postAuth(serviceName: string, data: any = {}, isUrl: boolean = false) {
    const url = (isUrl) ? serviceName : environment.apiUrl + "/" + serviceName;
    return this.http.post(url, data, { headers: this.getHeaders() })
  }
  /**
   * Envía una petición PATCH con autenticación
   * @param serviceName {string}
   * @param data {any}
   * @param isUrl {boolean}
   */
  patchAuth(serviceName: string, data: any = {}, isUrl: boolean = false) {
    const url = (isUrl) ? serviceName : environment.apiUrl + "/" + serviceName;
    return this.http.patch(url, data, { headers: this.getHeaders() })
  }
  /**
   * Envía una petición PUT con autenticación
   * @param serviceName {string}
   * @param data {any}
   * @param isUrl {boolean}
   */
  putAuth(serviceName: string, data: any = {}, isUrl: boolean = false) {
    const url = (isUrl) ? serviceName : environment.apiUrl + "/" + serviceName;
    return this.http.put(url, data, { headers: this.getHeaders() })
  }
  /**
   * Sube un XML
   * @param serviceName {string}
   * @param data {any}
   */
  postXml(serviceName: string, data: any = {}) {
    const url = environment.apiUrl + "/" + serviceName;
    let token = this.storageService.getWithoutAsync(AuthConstants.AUTH);
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Authorization': `${token}`,
      'Content-Disposition': "attachment; filename='file.xls'"
    });

    return this.http.post(url, data, {
      headers: header, reportProgress: true,
      observe: 'events'
    })
  }
  /**
   * Descarga un XML
   * @param serviceName {string}
   */
  getXmlDownload(serviceName: string) {
    const url = environment.apiUrl + "/" + serviceName;
    let token = this.storageService.getWithoutAsync(AuthConstants.AUTH);
    const header = new HttpHeaders({
      'Authorization': `${token}`,
    });
    return this.http.get(url, {
      headers: header, reportProgress: true,
      observe: 'events', responseType: 'blob'
    })
  }

  /**
   * 
   * @returns Objeto de HttpHeader con su configuración
   */
  getHeaders(): HttpHeaders {
    let token = "";
    this.storageService.getItem(AuthConstants.AUTH).subscribe(
      (data) => {
        token = data;
      }
    );

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
  }
}
