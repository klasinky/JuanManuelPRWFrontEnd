import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container") as HTMLDivElement;
    
    if(sign_up_btn != null && container != null && sign_in_btn != null){
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });
      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    } 

    /*const sign_in_btn = document.getElementById("#sign-in-btn") as HTMLButtonElement;
    const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLButtonElement;
    const container = document.querySelector(".container") as HTMLDivElement;

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
    
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });*/
  }
}
