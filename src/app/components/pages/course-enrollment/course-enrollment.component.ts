import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/services/@types';
import { CoursesService } from 'src/app/services/courses.service';
import { CoutryAPI } from '@components/@types/countries';
@Component({
  selector: 'app-course-enrollment',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.scss'],
})
export class CourseEnrollmentComponent implements OnInit {
  course: Course | undefined;
  coursePrices: { value: number; currency: string }[] | undefined;
  countries: CoutryAPI[] | undefined;

  constructor(
    private http: CoursesService,
    private httpClient: HttpClient,
    private activeRoute: ActivatedRoute,
    private title: Title
  ) {}

  updatePageTitle(title: string) {
    const currTitle = this.title.getTitle();

    this.title.setTitle(`${currTitle} ${title}`);
  }

  getIsoCode(numericCode: number) {
    let currency = '';

    const country = this.countries?.find(
      (country) => country.ccn3 === numericCode.toString()
    );

    if (country) {
      const countryCurrency = country.currencies ? country.currencies : {};
      currency = Object.keys(countryCurrency)[0];
    }

    return currency;
  }

  mapPricingList(pricingList: Course['pricing']) {
    this.coursePrices = pricingList.map((course) => ({
      ...course,
      currency: this.getIsoCode(course.currency),
    }));
  }

  ngOnInit(): void {
    const courseIdParam = this.activeRoute.snapshot.paramMap.get('courseId');

    this.httpClient
      .get('https://restcountries.com/v3.1/all')
      .subscribe((res) => {
        this.countries = res as unknown as CoutryAPI[];
      });

    if (courseIdParam) {
      this.http.getCourse(courseIdParam).subscribe((res) => {
        this.course = res.result;
        this.updatePageTitle(this.course.name);
        this.mapPricingList(this.course.pricing);
      });
    }
  }
}
