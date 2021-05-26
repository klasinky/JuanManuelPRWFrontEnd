import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  /**
   * Genera estilos dependiendo del nombre del usuario
   * @param username {string}
   */
  getColor(username: string = "") {
    const colors = [
      { 'background-color': '#EFD600', 'color': '#000000' },
      { 'background-color': '#2196F3', 'color': '#ffffff' },
      { 'background-color': '#0312AB', 'color': '#ffffff' },
      { 'background-color': '#AB0399', 'color': '#ffffff' },
      { 'background-color': '#AB6403', 'color': '#ffffff' }]

    const random = username.length % colors.length;
    return colors[random];
  }
}
