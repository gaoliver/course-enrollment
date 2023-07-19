import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-tab',
  templateUrl: './signin-tab.component.html',
  styleUrls: ['./signin-tab.component.scss'],
})
export class SigninTabComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  isPasswordVisible: boolean = false;

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return
  }

  togglePassVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
