import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/interfaces/register';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../auth.component.scss', './register.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
/**
 * Componente para registrar
 */
export class RegisterComponent implements OnInit {

  /**
   * Formulario reactivo para el register
   */
  formRegister: FormGroup;
  /**
   * Boolean para mostrar los errores del username
   */
  usernameError = false;
  /**
   * Boolean para mostrar los errores del email
   */
  emailError = false;
  /**
   * Boolean para mostrar los errores del password
   */
  passwordError = false;
  /**
   * Boolean para mostrar los errores del nomField
   */
  nonFieldError = false;
  /**
   * Array de los errores del username
   */
  usernameErrorMessage: string[] = [];
  /**
   * Array de los errores del email
   */
  emailErrorMessage: string[] = [];
  /**
   * Array de los errores del password
   */
  passwordErrorMessage: string[] = [];
  /**
   * Array de los errores del nonField
   */
  nonFieldErrorMessage: string[] = [];
  /**
   * Boolean para mostrar el spinner de carga
   */
  showLoader = false;
  /**
   * Evento para cambiar a la pestaña del login cuando se registre
   */
  @Output() registerDone: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {

    this.formRegister = this.getForm();
  }

  ngOnInit(): void {
    this.ifChangeInput('username', 'usernameError');
    this.ifChangeInput('email', 'emailError');
    this.ifChangeInput('password', 'passwordError');
    this.ifChangeInput('password', 'nonFieldError');
  }
  /**
   * Retorna el formulario con sus validaciones
   * necesarias para el register
   */
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
  /**
   * Verifica si las contraseñas de los campos son iguales
   * @param c {AbstractControl} Formulario
   */
  passwordConfirming(c: AbstractControl) {
    if (c.get('password')?.value !== c.get('password_confirmation')?.value) {
      return { invalid: true };
    }
    return null;
  }

  /**
   * Registra al usuario
   */
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
          this.showLoader = false;
          this.registerDone.emit(true);
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
   * @param nameError {string} = Nombre del atributo {boolean} al que hace referencia el error
   * @param arrayMessage {string []} Array de mensajes que se van a mostrar
   */
  addMessageError(nameError: string, arrayMessage: string[]) {
    if (arrayMessage) {
      (this as any)[nameError] = true;
    }
  }

  /**
   * Limpia todos los campos de errores
   */
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

  /**
   * Realiza un suscripción al campo del formulario que se indique
   * para cambiar el boolean del error a false
   * @param name {any} Nombre del campo del formulario
   * @param nameError Nombre del campo del error
   */
  ifChangeInput(name: any, nameError: any) {
    this.formRegister.get(name)?.valueChanges.subscribe(val => {
      (this as any)[nameError] = false
    });
  }

  /**
   * Reinicia el formulario
   */
  resetForm() {
    this.formRegister.reset();
  }

}
