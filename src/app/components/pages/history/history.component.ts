import { Component } from '@angular/core';
import { Course } from '@src/app/services/@types/apiResponses';
import { UserService } from '@src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  courses: Course[] | undefined;

  constructor(private userService: UserService) {
    this.userService.isAuthenticated();
  }
}
