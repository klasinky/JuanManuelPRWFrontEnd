import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/interfaces/notification';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../sidebar.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification?: Notification;
  @Output() deleteNotification: EventEmitter<Notification> = new EventEmitter();

  constructor(private router: Router,
    private httpService: HttpService) { }

  ngOnInit(): void {
  }

  toLink() {
    let url = "";
    if (this.notification?.notification_type == 'comment'
      || this.notification?.notification_type == 'post') {

      url = '/dashboard/post/' + this.notification.id_type;
    } else {
      url = '/dashboard/user/' + this.notification?.from_user;
    }
    this.router.navigate([url]).then(() => {
      this.readNotification();
    })

  }

  readNotification() {
    this.deleteNotification.emit(this.notification);

    const url = 'notifications/' + this.notification?.id;
    this.httpService.putAuth(url).subscribe(
      (data) => {
      },
      (error) => {

      }
    )
  }

}
