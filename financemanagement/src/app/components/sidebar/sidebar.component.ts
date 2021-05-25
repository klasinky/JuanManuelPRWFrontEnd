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
export class SidebarComponent implements OnInit {
  
  @ViewChild('navbar', {static: false}) navbar?: HTMLElement; //Get the NavbarComponent
  @Input() userData!: User;  
  notifications: Notification[] = [];
  ring: boolean = true;
  firstTime: boolean = true;
  destroyed$ = new Subject();
  audio = new Audio('../../assets/ringtones.mp3')
  isNavbarCollapsed: boolean = true;

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

  getNotifications() {
    this.httpService.getAuth('notifications').subscribe(
      (data) => {
        this.notifications = data as any[];
        this.activateRing();
        this.titleService.setTitle(`Finaccess ${this.getTitle()}`);
      },
      (error) => {
        console.log(error);

      }
    )
  }

  getStyle() {
    return this.colorService.getColor(this.userData?.username);
  }

  logOutAction() {
    this.authService.logout();
  }

  removeNotification(notification: Notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
    this.titleService.setTitle(`Finaccess ${this.getTitle()}`);

  }

  activateRing() {
    this.ring = false
    this.ring = true;
    setTimeout(() => {
      this.ring = false;

    }, 1500)
  }

  getTitle(){
    const lengthArray = this.notifications.length;
    return lengthArray > 0?`(${lengthArray})`:"";
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
