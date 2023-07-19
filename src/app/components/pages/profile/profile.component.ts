import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserService } from '@src/app/services/user.service';
import { User } from '@src/app/store/@types/interfaces';
import { getAppSelector } from '@src/app/store/app.selectors';
import { AppState } from '@src/app/store/app.state';
import { getUserLogout } from '@src/app/store/user/user.actions';
import { env } from '@src/environments/env';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User | undefined;

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {
    this.userService.isAuthenticated();
  }

  onLogout() {
    localStorage.removeItem(env.userToken);
    this.store.dispatch(getUserLogout());
  }
}
