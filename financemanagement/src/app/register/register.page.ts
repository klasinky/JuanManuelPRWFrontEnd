import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../interfaces/register';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usernameError = false;
  emailError = false;
  passwordError = false;
  nonFieldError = false;

  usernameErrorMessage = [];
  emailErrorMessage = [];
  passwordErrorMessage = [];
  nonFieldErrorMessage = [];


  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService) { }

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.form = this.fb.group({
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

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('password_confirmation').value) {
      return { invalid: true };
    }
  }

  registerAction() {

    if (this.form.valid) {
      this.clearFiles();
      const dataRegister = {
        username: this.form.value.username,
        email: this.form.value.email,
        name: this.form.value.name,
        password: this.form.value.password,
        password_confirmation: this.form.value.password_confirmation,
      } as Register;

      this.authService.register(dataRegister).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['login']);
        },
        (error) => {
          console.log(error);

          const usernameErrorArray = error.error.username;
          const emailErrorArray = error.error.email;
          const passwordErrorArray = error.error.password;
          const nonFieldErrorArray = error.error.non_field_errors;

          const allNameError = ['usernameError', 'emailError', 'passwordError', 'nonFieldError']
          const allArrayError = [usernameErrorArray, emailErrorArray, passwordErrorArray, nonFieldErrorArray];
          const allArrayMessage = [this.usernameErrorMessage, this.emailErrorMessage, this.passwordErrorMessage, this.nonFieldErrorMessage]

          for (let i = 0; i < allArrayMessage.length; i++)
            this.addMessageError(allNameError[i], allArrayMessage[i], allArrayError[i]);

        }
      )
    } else {
      console.log("FALSE")
    }
  }

  /**
   * Funcion que agrega los mensajes de error y cambia el status para mostrarlos
   * nameError {string} = Nombre del atributo {boolean} al que hace referencia el error
   * arrayMessage = Array de mensajes que se van a mostrar
   * arrayError {string[]}
   */
  addMessageError(nameError: string, arrayMessage: String[], arrayError: String[]) {
    if (arrayError) {
      this[nameError] = true;
      arrayError.forEach(msg => {
        arrayMessage.push(msg);
      });
    }
  }

  clearFiles(){
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
