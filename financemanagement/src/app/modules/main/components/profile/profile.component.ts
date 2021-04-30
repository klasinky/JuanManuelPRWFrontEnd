import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthConstants } from 'src/app/config/auth=constant';
import { Currency } from 'src/app/interfaces/currency';
import { ChangePassword } from 'src/app/interfaces/password';
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
  currenciesOptions?: Currency[]

  oldPasswordError = false;
  oldPasswordErrorMessage: string[] = [];
  newPasswordError = false;
  newPasswordErrorMessage: string[] = [];

  showLoader = false;

  emailError = false;
  usernameError = false;
  nameError = false;
  currencyError = false;
  emailErrorMessage: string[] = [];
  usernameErrorMessage: string[] = [];
  nameErrorMessage: string[] = [];
  currencyErrorMessage: string[] = [];

  showLoaderProfile = false;


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
    this.getCurrencyList();
    this.ifChangeInput('old_password', 'oldPasswordError', 'formPassword');
    this.ifChangeInput('new_password', 'newPasswordError', 'formPassword');

  }

  getCurrencyList() {
    const url = "currencies";
    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.currenciesOptions = data as Currency[];
      },
      (error) => {
      }
    )
  }

  getUserInfo() {
    const url = "users/me";
    this.httpService.getAuth(url).subscribe(
      (data: User) => {
        this.user = data;
        this.formProfile.get("name")?.setValue(this.user?.name);
        this.formProfile.get("email")?.setValue(this.user?.email);
        this.formProfile.get("username")?.setValue(this.user?.username);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  profileAction() {
    const serviceName = 'users/me';
    if (this.formProfile?.valid) {
      this.clearFiles();
      this.showLoaderProfile = true;
      const userNewData = {
        name: this.formProfile?.get("name")?.value,
        username: this.formProfile?.get("username")?.value,
        email: this.formProfile?.get("email")?.value,
        currency: this.formProfile?.get("currency")?.value,
      } as User;
      this.httpService.patchAuth(serviceName, userNewData).subscribe(
        (data: User) => {
          this.storageService.setItem(AuthConstants.DATAUSER, data)
          this.showLoaderProfile = false;
          this.toastr.success('Datos actualizados', '')
        },
        (error: any) => {
          console.log(error);
          this.showLoaderProfile = false;
          this.emailErrorMessage = error.error.email;
          this.usernameErrorMessage = error.error.username;
          this.nameErrorMessage = error.error.name;
          this.currencyErrorMessage = error.error.currency;

          const allNameError = ['emailError', 'usernameError', 'nameError', 'currencyError'];
          const allArrayMessage = [this.emailErrorMessage, this.usernameErrorMessage,
          this.nameErrorMessage, this.currencyErrorMessage];
          for (let i = 0; i < allArrayMessage.length; i++)
            this.addMessageError(allNameError[i], allArrayMessage[i]);

        }
      )
  }
}

changeUserPasswordAction() {
  const serviceName = 'users/me/changepassword';
  if (this.formPassword?.valid) {
    this.clearFiles();
    this.showLoader = true;
    const dataPassword = {
      old_password: this.formPassword.value.old_password,
      new_password: this.formPassword.value.new_password
    } as ChangePassword;

    this.httpService.patchAuth(serviceName, dataPassword).subscribe(
      (data: any) => {
        this.showLoader = false;
        this.toastr.success(data.message, 'Contraseña actualizada')
        this.resetForms();
      },
      (error: any) => {
        this.showLoader = false;

        this.oldPasswordErrorMessage = error.error.old_password;
        this.newPasswordErrorMessage = error.error.new_password;

        const allNameError = ['oldPasswordError', 'newPasswordError'];
        const allArrayMessage = [this.oldPasswordErrorMessage, this.newPasswordErrorMessage];

        for (let i = 0; i < allArrayMessage.length; i++)
          this.addMessageError(allNameError[i], allArrayMessage[i]);
      }
    )
  }
}

getFormProfile(): FormGroup {
  return this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'username': ['', [Validators.required, Validators.minLength(3)]],
    'currency': ['', [Validators.required]]
  });
}

getFormPassword(): FormGroup {
  return this.fb.group({
    'old_password': ['', [Validators.required, Validators.minLength(8)]],
    'new_password': ['', [Validators.required, Validators.minLength(8)]],
  });
}

addMessageError(nameError: string, arrayMessage: String[]) {
  if (arrayMessage) {
    (this as any)[nameError] = true;
  }
}

ifChangeInput(name: any, nameError: any, form: string) {
  (this as any)[form].get(name)?.valueChanges.subscribe((val: any) => {
    (this as any)[nameError] = false
  });
}

clearFiles() {
  this.oldPasswordError = false;
  this.newPasswordError = false;
  this.oldPasswordErrorMessage = [];
  this.newPasswordErrorMessage = [];

  this.emailError = false;
  this.usernameError = false;
  this.nameError = false;
  this.currencyError = false;
  this.emailErrorMessage  = [];
  this.usernameErrorMessage  = [];
  this.nameErrorMessage  = [];
  this.currencyErrorMessage = [];
}

resetForms() {
  this.formPassword.reset();
}
}
