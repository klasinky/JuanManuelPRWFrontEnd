import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces/register';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../auth.component.scss', './register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  
  formRegister: FormGroup;

  usernameError = false;
  emailError = false;
  passwordError = false;
  nonFieldError = false;

  usernameErrorMessage: string[] = [];
  emailErrorMessage: string[] = [];
  passwordErrorMessage: string[] = [];
  nonFieldErrorMessage: string[] = [];

  showLoader = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {

    this.formRegister = this.getForm();
  }

  ngOnInit(): void {

    this.formRegister?.get('username')?.valueChanges.subscribe(val => {
      this.usernameError = false;
    });
    this.formRegister?.get('email')?.valueChanges.subscribe(val => {
      this.emailError = false;
    });
    this.formRegister?.get('password')?.valueChanges.subscribe(val => {
      this.passwordError = false;
      this.nonFieldError = false;
    });

  }

  getForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
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

  registerAction() {
    
    if (this.formRegister?.valid) {
      this.clearFiles();
      this.showLoader = true;
      const dataRegister = {
        username: this.formRegister?.value.username,
        email: this.formRegister?.value.email,
        name: this.formRegister?.value.name,
        password: this.formRegister?.value.password,
        password_confirmation: this.formRegister?.value.password_confirmation,
      } as Register;

      this.authService.register(dataRegister).subscribe(
        (data) => {
          console.log(data);
          //this.router.navigate(['login']);
          this.showLoader = false;

        },
        (error) => {
          this.showLoader = false;

          this.usernameErrorMessage = error.error.username;
          this.emailErrorMessage = error.error.email;
          this.passwordErrorMessage = error.error.password;
          this.nonFieldErrorMessage = error.error.non_field_errors;

          const allNameError = ['usernameError', 'emailError', 'passwordError', 'nonFieldError']
          const allArrayMessage = [this.usernameErrorMessage, this.emailErrorMessage, this.passwordErrorMessage, this.nonFieldErrorMessage]

          for (let i = 0; i < allArrayMessage.length; i++)
            this.addMessageError(allNameError[i], allArrayMessage[i]);
        }

        
      )
    }

  }

    /**
   * Función que agrega los mensajes de error y cambia el status para mostrarlos
   * nameError {string} = Nombre del atributo {boolean} al que hace referencia el error
   * arrayMessage = Array de mensajes que se van a mostrar
   */
  addMessageError(nameError: string, arrayMessage: String[]) {
    if (arrayMessage) {
      (this as any)[nameError] = true;
    }
  }

  clearFiles() {
    this.usernameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.nonFieldError = false;
    this.usernameErrorMessage = [];
    this.emailErrorMessage = [];
    this.passwordErrorMessage = [];
    this.nonFieldErrorMessage = [];
  }

}
