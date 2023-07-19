import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Course } from '@src/app/services/@types/apiResponses';
import { UserService } from '@src/app/services/user.service';
import { EnrolledCourse } from '@src/app/store/@types/interfaces';
import { getAppSelector } from '@src/app/store/app.selectors';
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
    this.store
      .pipe(select(getAppSelector))
      .subscribe(
        (state) => {
          this.courses = state.userState.user?.enrolled_courses

          console.log(state.userState.user?.enrolled_courses)
        }
      );
  }
}
