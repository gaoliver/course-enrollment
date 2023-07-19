import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
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

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.pipe(select(getAppSelector)).subscribe((state) => {
      this.user = state.userState.user;

      this.isAuthenticated();
    });
  }

  isAuthenticated() {
    if (!this.user?.id) {
      this.router.navigate(['sign-in']);
    }
  }

  onLogout() {
    localStorage.removeItem(env.userToken);
    this.store.dispatch(getUserLogout());
  }
}
