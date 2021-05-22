import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { SocketService } from 'src/app/services/socket.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private socketNotification: SocketService,
    private toastr: ToastrService) { }
  @Input() userData!: User;


  isMobile: boolean = false;
  notifications: any[] = [];
  ring: boolean = true;
  firstTime: boolean = true;
  destroyed$ = new Subject();

  ngOnInit(): void {
    this.getNotifications();
    const notiSub$ = this.socketNotification.connect().pipe(
      takeUntil(this.destroyed$),
    );
    console.log(notiSub$);
    notiSub$.subscribe(notification => {
      this.notifications.unshift(notification);
      this.activateRing();
      this.toastr.success("Tienes una nueva notificación")
    });
  }

  getNotifications() {
    this.httpService.getAuth('notifications').subscribe(
      (data) => {
        this.notifications = data as any[];
        this.activateRing();
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
    this.ring = false
    this.ring = true;
    setTimeout(() => {
      this.ring = false;

    }, 1500)
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
