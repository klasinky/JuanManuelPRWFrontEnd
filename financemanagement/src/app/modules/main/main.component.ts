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
/**
 * Componente MAIN
 */
export class MainComponent implements OnInit {
  /**
   * Indica si se muestra el spinner de carga
   */
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
  /**
   * Obtiene los datos del usuario
   */
  getUserData() {
    this.storageService.getItem(AuthConstants.DATAUSER).subscribe((data: User) => {
      this.userData = data;
    })
  }
  /**
   * Listener para cambiar al componente del usuario cuando se haga click
   * @param event {Event}
   */
  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      if (element.className === 'tool-username') {
        event.preventDefault();
        const route = element?.getAttribute('href');
        if (route) {
          this.router.navigate([`/dashboard/user/${route}`]);
        }
      }
    }
  }

}
