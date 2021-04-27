import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }
  @Input() userData!: User;

  isMobile: boolean = false;

  ngOnInit(): void {
    
    
  }


  mobileSideBar(){
    this.isMobile = !this.isMobile;
    document.querySelector("body")?.classList.toggle("mobile-nav-active");
  }

  logOutAction(){
    this.authService.logout();
  }
}
