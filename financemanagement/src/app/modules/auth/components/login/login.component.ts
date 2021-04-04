import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from '../../../../config/auth=constant';
import { Login } from '../../../../interfaces/login';
import { AuthService } from '../../../../services/auth.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../auth.component.scss' , './login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup

  nonFieldError = false;
  nonFieldErrorMessage: String[] = [];
 
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,) {
      this.formLogin = this.getForm();
    }

  ngOnInit() {
    const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLButtonElement;
    sign_up_btn.addEventListener("click", () => {
      this.formLogin.reset();
    });

    this.ifChangeInput('email');
    this.ifChangeInput('password');

  }

  getForm() {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.minLength(2)]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Iniciar sesión
   */
  loginAction(){
    if(this.formLogin.valid){
      this.clearFiles();
      const dataLogin = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      }

      this.authService.login(dataLogin).subscribe(
        (data)=>{
          const token = 'Token '+data.access_token;
          this.storageService.store(AuthConstants.AUTH, token);
          this.storageService.store(AuthConstants.DATAUSER, data.user);
          this.router.navigate(['dashboard']);
        },
        (error)=>{
          const nonFieldError = error.error.non_field_errors;
          this.nonFieldError = true;
          nonFieldError.forEach((element:string) => {
            this.nonFieldErrorMessage.push(element);
          });
        }
      )
      
    }else{
     console.log("false");
    }
  }

  clearFiles(){
    this.nonFieldError = false;
    this.nonFieldErrorMessage = [];
  }

  ifChangeInput(name: any){
    this.formLogin.get(name)?.valueChanges.subscribe(val => {
      this.nonFieldError = false;
      this.nonFieldErrorMessage = [];
    });
  }


}
