import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
/**
 * Componente para la autenticación
 */
export class AuthComponent implements OnInit {

  /**
   * Componente hijo del Login
   */
  @ViewChild(LoginComponent) childLogin!: LoginComponent;
  /**
   * Componente hijo del Register
   */
  @ViewChild(RegisterComponent) childRegister!: RegisterComponent;

  /**
   * Boolean para mostrar el registro
   */
  signUpActive: boolean = false;
  /**
   * Boolean para mostrar el formulario de registro
   */
  signUpFormActive: boolean = false;
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  /**
   * Cambiar al login
   */
  signInMode() {
    this.signUpActive = false;
    this.childRegister.resetForm();
    setTimeout(() => {
      this.signUpFormActive = false;
    }, 1000)
  }

  /**
   * Cambiar al register
   */
  signUpMode() {
    this.signUpActive = true;
    this.childLogin.resetForm();
    setTimeout(() => {
      this.signUpFormActive = true;
    }, 1000)
  }

  /**
   * Muestra una notificación y cambia al modo SignIn
   * @param _event {boolean} Evento para cambiar al modo de iniciar sesión
   */
  showAlertRegister(_event: boolean): void {
    this.signInMode();
    this.toastr.success('Ahora inicia sesión', 'Registrado correctamente')
  }


}
