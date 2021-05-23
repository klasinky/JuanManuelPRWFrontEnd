import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthConstants } from 'src/app/config/auth=constant';
import { Currency } from 'src/app/interfaces/currency';
import { ChangePassword } from 'src/app/interfaces/password';
import { User } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user?: User
  currenciesOptions?: Currency[]
  imageURL?: string;
  profilePic?: string;
  filename: string = "Selecciona un archivo.";

  // Forms
  formProfile: FormGroup;
  formPassword: FormGroup;

  // Errors
  oldPasswordError = false;
  oldPasswordErrorMessage: string[] = [];
  newPasswordError = false;
  newPasswordErrorMessage: string[] = [];
  emailError = false;
  usernameError = false;
  nameError = false;
  currencyError = false;
  emailErrorMessage: string[] = [];
  usernameErrorMessage: string[] = [];
  nameErrorMessage: string[] = [];
  currencyErrorMessage: string[] = [];

  // Loaders
  showLoaderProfile = false;
  showLoader = false;

  constructor(private httpService: HttpService,
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
    const url: string = environment.endpoints.currency.all;

    this.httpService.getAuth(url).subscribe(
      (data) => {
        this.currenciesOptions = data as Currency[];
      },
      (error) => {
      }
    )
  }

  getUserInfo() {
    const url: string = environment.endpoints.auth.profile;
    this.imageURL = "";
    this.httpService.getAuth(url).subscribe(
      (data: User) => {
        this.user = data;
        this.formProfile.get("name")?.setValue(this.user?.name);
        this.formProfile.get("email")?.setValue(this.user?.email);
        this.formProfile.get("username")?.setValue(this.user?.username);
        console.log(this.user.currency);
        
        this.formProfile.get("currency")?.setValue(this.user?.currency?.id);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  profileAction() {
    const url: string = environment.endpoints.auth.profile;

    if (this.formProfile?.valid) {
      this.clearFiles();
      this.showLoaderProfile = true;

      const userNewData = {
        name: this.formProfile?.get("name")?.value,
        username: this.formProfile?.get("username")?.value,
        email: this.formProfile?.get("email")?.value,
        currency: this.formProfile?.get("currency")?.value,
      } as User;

      if (this.imageURL) {
        userNewData.profile_pic = this.imageURL;     
      }
   
      this.httpService.patchAuth(url, userNewData).subscribe(
        (data: User) => {
          this.getUserInfo();
          this.storageService.setItem(AuthConstants.DATAUSER, data);
          this.showLoaderProfile = false;
          this.toastr.success('Datos actualizados', '');
          this.clearFiles();
        },
        (error: any) => {
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
    const url: string = environment.endpoints.auth.changePassword;

    if (this.formPassword?.valid) {
      this.clearFiles();
      this.showLoader = true;

      const dataPassword = {
        old_password: this.formPassword.value.old_password,
        new_password: this.formPassword.value.new_password
      } as ChangePassword;

      this.httpService.patchAuth(url, dataPassword).subscribe(
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

  deleteProfileImage(){
    const url: string = environment.endpoints.auth.profile;
    const dataImage = {
      profile_pic: null
    };

    this.httpService.patchAuth(url, dataImage).subscribe(
      (data: User)=>{
        this.getUserInfo();
        this.toastr.success("Has eliminado la foto de perfil");
      },
      (error) =>{
        this.toastr.error("No se ha podido eliminar la de perfil");
      }
    )
  }

  getFormProfile(): FormGroup {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'username': ['', [Validators.required, Validators.minLength(3)]],
      'currency': ['', [Validators.required]],
      'profile_pic':[null]
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

    this.filename = "Selecciona un archivo.";

    this.emailError = false;
    this.usernameError = false;
    this.nameError = false;
    this.currencyError = false;
    this.emailErrorMessage = [];
    this.usernameErrorMessage = [];
    this.nameErrorMessage = [];
    this.currencyErrorMessage = [];
  }

  resetForms() {
    this.formPassword.reset();
  }

  // Image Preview
  showPreview(event: any) {
    const file = event.target?.files[0];
    this.formProfile.patchValue({
      profile_pic: file
    });
    this.formProfile.get('profile_pic')?.updateValueAndValidity()
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.filename = file.name;
    }
    reader.readAsDataURL(file)
  }

}
