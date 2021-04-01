import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  @Input() title: string;


  constructor(private authService: AuthService) { }

  logOut(){
    this.authService.logout();
  }
  
}
