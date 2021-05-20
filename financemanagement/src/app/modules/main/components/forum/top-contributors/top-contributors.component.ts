import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-top-contributors',
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.scss',
   '../tags-detail/tags-detail.component.scss']
})
export class TopContributorsComponent implements OnInit {

  @Input()user?: UserProfile;
  loadingFollow = false;

  constructor(private httpService: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  follow() {
    const url: string = "users/profile/" + this.user?.username;
    this.loadingFollow = true;
    this.httpService.patchAuth(url).subscribe(
      (data: any) => {
        this.loadingFollow = false;
        this.user = data as UserProfile;
        let msg = "Has dejado de seguir a este usuario";
        if (this.user.is_following) {
          msg = "Has comenzado a seguir a este usuario";
        }

        this.toastr.success(msg);
      },
      (error: any) => {
        this.loadingFollow = false;
        this.toastr.error(error.error.detail, 'Error');
      }
    )
  }

}
