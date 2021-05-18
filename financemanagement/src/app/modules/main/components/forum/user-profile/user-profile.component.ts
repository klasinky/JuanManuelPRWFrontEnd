import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  username?: string;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        this.username = params.username;
      } catch (error) {
        this.router.navigate(['dashboard']).then(() => {
          // Notificación
          this.toastr.error('Ha ocurrido un error', 'Error');
        })
      }
    });
  }

  getInfoProfile(){
    const url: string = "";

    this.httpService.getAuth(url).subscribe(
      (data:any) => {
        
      },
      (error:any) => {
        
      }
    )
  }

}
