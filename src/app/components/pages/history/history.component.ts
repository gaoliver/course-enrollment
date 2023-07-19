import { Component } from '@angular/core';
import { UserService } from '@src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor(private userService: UserService) {
    this.userService.isAuthenticated();
  }
}
