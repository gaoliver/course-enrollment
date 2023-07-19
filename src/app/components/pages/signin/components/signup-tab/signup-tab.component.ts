import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from '@src/app/components/atoms/snackbar/snackbar.component';
import { UserResponse, UserService } from '@src/app/services/user.service';

@Component({
  selector: 'app-signup-tab',
  templateUrl: './signup-tab.component.html',
  styleUrls: ['./signup-tab.component.scss'],
})
export class SignupTabComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
    ]),
  });

  passwordConfirmation = new FormControl('', [Validators.required]);

  isPasswordVisible: boolean = false;
  isPasswordConfirmVisible: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getNameErrorMessage() {
    if (this.form.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.controls['name'].hasError('minlength')
      ? 'You must write your full name'
      : '';
  }

  getEmailErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form.controls['email'].hasError('emailExists')) {
      return 'This e-mail is already registered';
    }

    return this.form.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.controls['password'].hasError('pattern')
      ? 'Your password is too weak'
      : '';
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
    return (
      this.form.controls['password'].value !== this.passwordConfirmation.value
    );
  }

  togglePassVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  togglePassConfirmVisible() {
    this.isPasswordConfirmVisible = !this.isPasswordConfirmVisible;
  }

  toggleSnackMessage(status: 'success' | 'error') {
    const message =
      status === 'error'
        ? 'There was an inexpected error. Please, try again later.'
        : 'Account successfully registered!';

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
      panelClass: [status === 'success' ? 'snackbar-success' : 'snackbar-warn'],
    });
  }

  onRegister() {
    if (this.checkPasswords()) {
      return this.passwordConfirmation.setErrors({ passwordsMismatch: true });
    }

    if (this.form.valid) {
      const status = this.userService.userRegister({
        id: Math.round(Math.random() * 1000).toString(),
        ...this.form.value,
      });

      if (status === UserResponse.ALREADY_EXISTS) {
        this.form.controls['email'].setErrors({ emailExists: true });
      }

      if (status === UserResponse.ERROR) {
        this.toggleSnackMessage('error');
      }

      if (status === UserResponse.SUCCESS) {
        this.router.navigate(['']);
        this.toggleSnackMessage('success');
      }
    }
  }
}
