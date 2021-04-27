import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthConstants } from 'src/app/config/auth=constant';
import { User } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formProfile: FormGroup;
  formPassword: FormGroup;
  user?: User


  constructor(private router: Router,
    private httpService: HttpService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.formProfile = this.getFormProfile();
    this.formPassword = this.getFormPassword();
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.storageService.get(AuthConstants.DATAUSER).then((data) => {
      const url = "users/profile/"+data.username;
      console.log(url);
      this.httpService.getAuth(url).subscribe(
        (data: User) => {
          console.log(data)
          this.user = data;
          // this.formProfile.get('name')?.setValue(this.user?.name);
        },
        (error) => {
          console.log(error);

        }
      )

    })
  }

  getFormProfile(): FormGroup {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'username': ['', [Validators.required]],
      'currency': ['', [Validators.required]]
    });
  }

  getFormPassword(): FormGroup {
    return this.fb.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(8)]],
    },
      {
        validator: this.passwordConfirming
      }
    );
  }

  passwordConfirming(c: AbstractControl) {
    if (c.get('password')?.value !== c.get('password_confirmation')?.value) {
      return { invalid: true };
    }
    return null;
  }
}
