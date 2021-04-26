import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formProfile: FormGroup;
  formPassword: FormGroup;

  constructor(    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private toastr: ToastrService) {     
      this.formProfile = this.getFormProfile();
      this.formPassword = this.getFormPassword();
    }

  ngOnInit(): void {
  }

  getFormProfile(): FormGroup {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'username': ['', [Validators.required]],
      'currency': ['', [Validators.required]]
    });
  }

  getFormPassword(): FormGroup {
    return this.fb.group({
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
}
