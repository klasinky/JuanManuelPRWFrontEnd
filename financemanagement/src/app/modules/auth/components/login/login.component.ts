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
  styleUrls: ['../../auth.component.scss', './login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
/**
 * Componente para el login
 */
export class LoginComponent implements OnInit {

  /**
   * Formulario reactivo para el login
   */
  formLogin: FormGroup
  /**
   * Boolean para mostrar los errores del nonField
   */
  nonFieldError = false;
  /**
   * Array de los errores del nonField
   */
  nonFieldErrorMessage: String[] = [];
  /**
   * Boolean para mostrar el spinner de carga
   */
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

  /**
   * Retorna el formulario con sus validaciones
   * necesarias para el login
   */
  getForm(): FormGroup {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.minLength(2)]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Iniciar sesión
   */
  loginAction() {
    if (this.formLogin.valid) {
      this.clearFiles();
      this.showLoader = true;
      const dataLogin = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      } as Login;

      this.authService.login(dataLogin).subscribe(
        (data) => {
          const token = 'Token ' + data.access_token;
          this.storageService.setItem(AuthConstants.DATAUSER, data.user)
          this.storageService.setItem(AuthConstants.AUTH, token)
          this.router.navigate(['dashboard']).then(() => {
            // Notificación
            this.toastr.info('Hola ' + data.user.name, 'Bievenido')
            this.showLoader = false;
          })

        },
        (error) => {
          this.showLoader = false;
          const nonFieldError = error.error.non_field_errors;
          this.nonFieldError = true;
          nonFieldError.forEach((element: string) => {
            this.nonFieldErrorMessage.push(element);
          });
        }
      )
    }
  }

  /**
   * Limpia los campos de errores
   */
  clearFiles() {
    this.nonFieldError = false;
    this.nonFieldErrorMessage = [];
  }

  /**
   * Realiza un suscripción al campo del formulario que se indique
   * para cambiar el boolean del error a false
   * @param name {any} Nombre del campo del formulario
   * @param nameError Nombre del campo del error
   */
  ifChangeInput(name: any, nameError: any) {
    this.formLogin.get(name)?.valueChanges.subscribe(val => {
      (this as any)[nameError] = false
    });
  }

  /**
   * Reinicia el formulario
   */
  resetForm() {
    this.formLogin.reset();
  }
}
