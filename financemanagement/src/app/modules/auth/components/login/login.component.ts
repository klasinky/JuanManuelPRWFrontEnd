import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../../../config/auth=constant';
import { Login } from '../../../../interfaces/login';
import { AuthService } from '../../../../services/auth.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {


  loginData = {
    email:"",
    password:""
  } as Login;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService) { }

  ngOnInit() {

  }
  
  validateInput(){
    /*let email = this.loginData.email.trim()
    let password = this.loginData.password.trim()
    //TODO validar email y contraseña
    return (this.loginData.email && 
      this.loginData.password && 
      this.loginData.email.length > 0 &&
      this.loginData.password.length > 0);*/
  }

  loginAction(){
    console.log("entra al login")
    //if(this.validateInput()){
      this.authService.login(this.loginData).subscribe(
        (data)=>{
          console.log(data);
          const token = 'Token '+data.access_token;
          this.storageService.store(AuthConstants.AUTH, token);
          this.storageService.store(AuthConstants.DATAUSER, data.user);
          this.router.navigate(['dashboard']);
        },
        (error)=>{
          const nonFieldError = error.error.non_field_errors;
          const emailErrors = error.error.email;
          const passwordErrors = error.error.password;
          console.log(emailErrors);
          console.log(passwordErrors);
          console.log(nonFieldError);
          
        }
      )
      
    /*}else{
      console.log("FALSE");
    }*/

  }
}
