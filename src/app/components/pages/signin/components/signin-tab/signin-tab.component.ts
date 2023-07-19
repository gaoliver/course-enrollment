import { Component } from '@angular/core';

@Component({
  selector: 'app-signin-tab',
  templateUrl: './signin-tab.component.html',
  styleUrls: ['./signin-tab.component.scss'],
})
export class SigninTabComponent {
  isPasswordVisible: boolean = false;

  togglePassVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
