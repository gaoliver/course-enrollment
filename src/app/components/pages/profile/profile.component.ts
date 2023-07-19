import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '@src/app/services/user.service';
import { User } from '@src/app/store/@types/interfaces';
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

    this.store.subscribe((state) => (this.user = state.userState.user));
  }

  onLogout() {
    localStorage.removeItem(env.userToken);
    this.store.dispatch(getUserLogout());
  }
}
