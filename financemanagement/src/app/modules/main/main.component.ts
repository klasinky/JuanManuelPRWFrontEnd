import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router : Router,
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

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      if (element.className === 'tool-username') {
        event.preventDefault();
        const route = element?.getAttribute('href');
        if (route) {
          console.log("ES route")
          console.log(route)
          this.router.navigate([`/dashboard/user/${route}`]);
        }
      }
    }
  }

}
