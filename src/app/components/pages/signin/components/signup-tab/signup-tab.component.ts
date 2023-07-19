import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserWithPassword } from '@src/app/services/@types/interfaces';
import { UserResponse, UserService } from '@src/app/services/user.service';

@Component({
  selector: 'app-signup-tab',
  templateUrl: './signup-tab.component.html',
  styleUrls: ['./signup-tab.component.scss'],
})
export class SignupTabComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(7)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ),
  ]);
  passwordConfirmation = new FormControl('', [Validators.required]);

  isPasswordVisible: boolean = false;
  isPasswordConfirmVisible: boolean = false;

  constructor(private userService: UserService) {}

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('minlength')
      ? 'You must write your full name'
      : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.email.hasError('emailExists')) {
      return 'This e-mail is already registered'
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('pattern') ? 'Your password is too weak' : '';
  }

  getPasswordConfirmErrorMessage() {
    if (this.passwordConfirmation.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordConfirmation.hasError('passwordsMismatch')
      ? 'Passwords are different'
      : undefined;
  }

  checkPasswords() {
    return this.password.value !== this.passwordConfirmation.value;
  }

  togglePassVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  togglePassConfirmVisible() {
    this.isPasswordConfirmVisible = !this.isPasswordConfirmVisible;
  }

  onPressRegister() {
    if (this.checkPasswords()) {
      return this.passwordConfirmation.setErrors({ passwordsMismatch: true });
    }

    if (this.email.value && this.name.value && this.password.value) {
      const user: UserWithPassword = {
        id: Math.round(Math.random() * 1000).toString(),
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      };

      const status = this.userService.userRegister(user);

      if (status === UserResponse.ALREADY_EXISTS) {
        this.email.setErrors({ emailExists: true });
      }
    }
  }
}
