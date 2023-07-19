import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse, UserService } from '@src/app/services/user.service';

@Component({
  selector: 'app-signin-tab',
  templateUrl: './signin-tab.component.html',
  styleUrls: ['./signin-tab.component.scss'],
})
export class SigninTabComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isPasswordVisible: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  getEmailErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form.controls['email'].hasError('incorrect')) {
      return this.form.controls['email'].getError('incorrect');
    }

    return this.form.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form.controls['password'].hasError('incorrect')) {
      return this.form.controls['password'].getError('incorrect');
    }

    return;
  }

  togglePassVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onLogin() {
    let status;

    if (this.form.valid) {
      status = this.userService.userLogin(this.form.value);
    }

    if (status === UserResponse.ERROR) {
      this.form.controls['email'].setErrors({
        incorrect: 'E-mail may be incorrect',
      });
      this.form.controls['password'].setErrors({
        incorrect: 'Password may be incorrect',
      });
    }

    if (status === UserResponse.SUCCESS) {
      this.router.navigate(['']);
    }
  }
}
