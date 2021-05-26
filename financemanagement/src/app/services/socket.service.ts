import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthConstants } from '../config/auth=constant';
import { User } from '../interfaces/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  /**
   * Objeto del socket
   */
  socket?: WebSocketSubject<any>;
  /**
   * URL del ws
   */
  url = 'wss://ws-finaccess.herokuapp.com/client';
  /**
   * Datos del usuario
   */
  userData?: User;
  /**
   * Token del usuario
   */
  token?: string;
  constructor(private storageService: StorageService) { }
  /**
   * Conecta al ws
   */
  connect(): Observable<any> {
    const tokenLength = "Token ".length;
    this.token = this.storageService.getWithoutAsync(AuthConstants.AUTH);
    this.token = this.token?.substring(tokenLength);
    this.userData = this.storageService.getWithoutAsync(AuthConstants.DATAUSER);
    const urlSocket = this.url + `?user_id=${this.userData?.id}?token=${this.token}`;
    this.socket = webSocket(urlSocket);
    return this.socket;
  }
  /**
   * Cierra el ws
   */
  closeConnection(): void {
    if (this.socket) {
      this.socket.complete();
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }

}
