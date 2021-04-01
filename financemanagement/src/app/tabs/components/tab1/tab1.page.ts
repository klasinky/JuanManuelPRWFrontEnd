import { Component, OnInit } from '@angular/core';
import { AuthConstants } from 'src/app/config/auth=constant';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  name?:string;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.get(AuthConstants.DATAUSER)
    .then(response =>{
      this.name = response.username;
    })  
  }

  
}
