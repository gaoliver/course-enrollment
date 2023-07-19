import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/services/@types';
import { CoursesService } from 'src/app/services/courses.service';
import { SnackbarComponent } from '../../atoms/snackbar/snackbar.component';

const ERROR_MESSAGE = 'There was an error on the API. Please, try again later.';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  coursesList: Course[] | undefined;

  constructor(private http: CoursesService, private snackBar: MatSnackBar) {}

  showSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
      panelClass: ['snackbar-warn'],
    });
  }

  onSearch(query: string) {
    this.http.getCourses({ filters: query }).subscribe(
      (res) => {
        this.coursesList = res.result.data;
      },
      () => this.showSnackBar(ERROR_MESSAGE)
    );
  }

  ngOnInit(): void {
    this.onSearch('');
  }
}
