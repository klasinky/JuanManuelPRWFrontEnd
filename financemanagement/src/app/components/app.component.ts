import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { LoggedOffGuard } from '../guards/logged-off.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'financemanagement';

  constructor(public loggedOff: LoggedOffGuard,
    public loggedIn: LoggedInGuard,
    public router: Router
  ) { }

  ngOnInit() { 
   }
}
