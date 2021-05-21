import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/interfaces/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification?: Notification;

  constructor(private router: Router) { }

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
    this.router.navigate([url]);

  }

  readNotification() {
    console.log("read");
  }

}
