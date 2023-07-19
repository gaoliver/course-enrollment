import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '@src/app/services/user.service';
import { EnrolledCourse } from '@src/app/store/@types/interfaces';
import { AppState } from '@src/app/store/app.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  courses: EnrolledCourse[] | undefined;

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.userService.isAuthenticated();
  }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.courses = state.userState.user?.enrolled_courses;

      console.log(state.userState.user?.enrolled_courses);
    });
  }
}
