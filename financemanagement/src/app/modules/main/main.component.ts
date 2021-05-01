import { Component, OnInit } from '@angular/core';
import { AuthConstants } from 'src/app/config/auth=constant';
import { User } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loading = false;

  constructor(
    private storageService: StorageService,
  ) {

  }

  userData!: User;
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    //this.userData = await this.storageService.get(AuthConstants.DATAUSER) as User;
    this.storageService.getItem(AuthConstants.DATAUSER).subscribe((data: User) => {
      this.userData = data;
    })
  }

}
