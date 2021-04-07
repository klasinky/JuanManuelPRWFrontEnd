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
export class AuthComponent implements OnInit {

  @ViewChild(LoginComponent) childLogin!: LoginComponent;
  @ViewChild(RegisterComponent) childRegister!: RegisterComponent;

  signUpActive:boolean = false;
  signUpFormActive:boolean = false;
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  /**
   * Cambiar al login
   */
  signInMode(){
    this.signUpActive = false;
    this.childRegister.resetForm();
    setTimeout(()=>{
      this.signUpFormActive = false;
    },1000)
  }

  /**
   * Cambiar al register
   */
  signUpMode(){
    this.signUpActive = true;
    this.childLogin.resetForm();
    setTimeout(()=>{
      this.signUpFormActive = true;
    },1000)
  }

  showAlertRegister(_event:boolean):void{
    this.signInMode();
    this.toastr.success('Ahora inicia sesión','Registrado correctamente')
  }

  ngOnDestroy(){
    console.log("Destroy")
  }
}
