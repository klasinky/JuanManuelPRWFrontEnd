import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  showLoader = false;
 
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formLogin = this.getForm();
    }

  ngOnInit() {
    this.ifChangeInput('email', 'nonFieldError');
    this.ifChangeInput('password', 'nonFieldError');
  }

  getForm(): FormGroup {
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
      this.showLoader = true;
      const dataLogin = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      } as Login;

      this.authService.login(dataLogin).subscribe(
        (data)=>{
          this.showLoader = false;
          const token = 'Token '+data.access_token;
          this.storageService.store(AuthConstants.AUTH, token);
          this.storageService.store(AuthConstants.DATAUSER, data.user);
          this.router.navigate(['dashboard']).then(() => {
            // Notificación
            this.toastr.info('Hola ' + data.user.name, 'Bievenido')
          });

        },
        (error)=>{
          this.showLoader = false;
          const nonFieldError = error.error.non_field_errors;
          this.nonFieldError = true;
          nonFieldError.forEach((element:string) => {
            this.nonFieldErrorMessage.push(element);
          });
        }
      )
    }
  }

  clearFiles(){
    this.nonFieldError = false;
    this.nonFieldErrorMessage = [];
  }

  ifChangeInput(name: any, nameError: any){
    this.formLogin.get(name)?.valueChanges.subscribe(val => {
      (this as any)[nameError] = false
    });
  }

  resetForm(){
    this.formLogin.reset();
  }
}
