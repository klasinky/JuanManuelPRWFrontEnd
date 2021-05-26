import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { SocketService } from 'src/app/services/socket.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser";
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
/**
 * Componente para el navbar
 */
export class SidebarComponent implements OnInit {

  /**
   * Objeto del usuario logueado
   */
  @Input() userData!: User;
  /**
   * Array de notificaciones
   */
  notifications: Notification[] = [];
  /**
   * Boolean para activar la animación de la campana
   */
  ring: boolean = true;
  /**
   * Subject para destruir el ws
   */
  destroyed$ = new Subject();
  /**
   * Audio de la notificación
   */
  audio = new Audio('../../assets/ringtones.mp3')

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private socketNotification: SocketService,
    private toastr: ToastrService,
    private titleService: Title,
    private colorService: ColorService) {
  }

  ngOnInit(): void {
    this.audio.load();
    this.getNotifications();
    const notiSub$ = this.socketNotification.connect().pipe(
      takeUntil(this.destroyed$),
    );

    notiSub$.subscribe(notification => {
      this.notifications.unshift(notification);
      this.activateRing();
      this.toastr.success("Tienes una nueva notificación");
      this.titleService.setTitle(`Finaccess ${this.getTitle()}`);
      this.audio.play();

    });
  }

  /**
   * Obtiene todas las notificaciones del usuario
   */
  getNotifications() {
    this.httpService.getAuth('notifications').subscribe(
      (data) => {
        this.notifications = data as any[];
        this.activateRing();
        // Cambia el título de la página
        this.titleService.setTitle(`Finaccess ${this.getTitle()}`);
      },
      (error) => {

      }
    )
  }

  /**
   * Retorna el color cuando no tiene imagen de perfil
   */
  getStyle() {
    return this.colorService.getColor(this.userData?.username);
  }

  /**
   * Evento que cierra la sesión del usuario
   */
  logOutAction() {
    this.authService.logout();
  }

  /**
   * Elimina una notificación del array
   */
  removeNotification(notification: Notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
    this.titleService.setTitle(`Finaccess ${this.getTitle()}`);
  }

  /**
   * Activa la animación de la campana
   */
  activateRing() {
    this.ring = false
    this.ring = true;
    setTimeout(() => {
      this.ring = false;

    }, 1500)
  }

  /**
   * Obtiene la cantidad de notificaciones para asignarla al título
   */
  getTitle() {
    const lengthArray = this.notifications.length;
    return lengthArray > 0 ? `(${lengthArray})` : "";
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
