import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private httpService: HttpService) { }
  @Input() userData!: User;


  isMobile: boolean = false;
  notifications: any[] = [];
  ring: boolean = true;
  firstTime: boolean = true;

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.httpService.getAuth('notifications').subscribe(
      (data) => {
        this.notifications = data as any[];
      },
      (error) => {
        console.log(error);

      }
    )
  }

  mobileSideBar() {

    this.isMobile = !this.isMobile;
    document.querySelector("body")?.classList.toggle("mobile-nav-active");
  }



  logOutAction() {
    this.authService.logout();
  }

  removeNotification(notification: Notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  activateRing() {
    if (this.firstTime) {
      this.firstTime = false;
    } else {
      this.getNotifications();
    }
    this.ring = false
    this.ring = true;
    setTimeout(() => {
      this.ring = false;

    }, 1500)
  }
}
