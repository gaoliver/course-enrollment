import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@src/app/store/@types/interfaces';
import { AppState } from '@src/app/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: User | undefined;

  constructor(private store: Store<AppState>) {
    this.store.subscribe((state) => (this.user = state.userState.user));
  }
}
