import { Component, OnInit } from '@angular/core';
import { CoursesList } from 'src/app/services/@types';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  coursesList: CoursesList | undefined;

  constructor(private http: CoursesService) {}

  ngOnInit(): void {
    this.http
      .getCourses()
      .subscribe((res) => (this.coursesList = res.result.data));
  }
}
