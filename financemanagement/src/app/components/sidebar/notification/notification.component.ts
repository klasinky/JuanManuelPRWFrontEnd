import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/interfaces/notification';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../sidebar.component.scss']
})
/**
 * Componente para mostrar una notifiación
 */
export class NotificationComponent implements OnInit {

  /**
   * Objeto de la notificación
   */
  @Input() notification?: Notification;
  /**
   * Evento para eliminar la notificación de la lista de notificaciones
   */
  @Output() deleteNotification: EventEmitter<Notification> = new EventEmitter();

  constructor(private router: Router,
    private httpService: HttpService) { }

  ngOnInit(): void {
  }

  /**
   * Cambia al componente dependiendo del tipo de notificación
   * Si el tipo es POST, MENTION o COMMENT, te lleva al post
   * Si es FOLLOW, te lleva al perfil del usuario
   */
  toLink() {

    let url = "";
    if (this.notification?.notification_type == 'comment'
      || this.notification?.notification_type == 'post'
      || this.notification?.notification_type == 'mention') {

      url = '/dashboard/post/' + this.notification.id_type;
    } else {
      url = '/dashboard/user/' + this.notification?.from_user;
    }
    this.router.navigate([url]).then(() => {
      this.readNotification();
    })

  }

  /**
   * Cambia la notificación a leída
   */
  readNotification() {
    this.deleteNotification.emit(this.notification);

    const url = 'notifications/' + this.notification?.id;
    this.httpService.putAuth(url).subscribe()
  }

}
