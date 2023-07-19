import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/services/@types';
import { CoursesService } from 'src/app/services/courses.service';
import { SnackbarComponent } from '../../atoms/snackbar/snackbar.component';

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
    });
  }

  onSearch(query: string) {
    this.http.getCourses({ filters: query }).subscribe(
      (res) => {
        console.log('working');
        this.coursesList = res.result.data;
      },
      () =>
        this.showSnackBar(
          'There was an error on the API. Please, try again later.'
        )
    );
  }

  ngOnInit(): void {
    this.onSearch('');
  }
}
