import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  @Input() userData!: User;

  isMobile: boolean = false;

  ngOnInit(): void {
    console.log(this.userData);
    
  }


  mobileSideBar(){
    this.isMobile = !this.isMobile;
    document.querySelector("body")?.classList.toggle("mobile-nav-active");

  }
}
