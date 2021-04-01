import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor() { }

  // ngOnInit() {}

  logOut(){
    console.log("HOLE");
    
  }
}
