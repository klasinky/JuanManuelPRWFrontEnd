import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

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
    setTimeout(()=>{
      this.signUpFormActive = false;
    },1000)
  }

  /**
   * Cambiar al register
   */
  signUpMode(){
    this.signUpActive = true;
    setTimeout(()=>{
      this.signUpFormActive = true;
    },1000)
  }

  showAlertRegister(_event:boolean):void{
    this.signInMode();
    this.toastr.success('Ahora inicia sesión','Registro hecho')
  }

}
