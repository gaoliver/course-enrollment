import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Course } from '@src/app/services/@types/apiResponses';
import { CoursesService } from 'src/app/services/courses.service';
import { CoutryAPI } from '@components/@types/countries';

import { FormBuilder, Validators } from '@angular/forms';
import { env } from '@src/environments/env';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/store/app.state';
import { EnrolledCourse, User } from '@src/app/store/@types/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../atoms/snackbar/snackbar.component';
import { UserService } from '@src/app/services/user.service';
import { Observable, map } from 'rxjs';
import { getAppState } from '@src/app/store/app.selectors';

interface MappedPricing {
  value: number;
  currency: string;
}
@Component({
  selector: 'app-course-enrollment',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.scss'],
})
export class CourseEnrollmentComponent implements OnInit {
  course: Course | undefined;
  enroledCourses: Observable<EnrolledCourse[] | undefined> | undefined;
  alreadyEnrolled = false;

  coursePrices: MappedPricing[] | undefined;
  countries: CoutryAPI[] | undefined;
  defaultSubscription: string | undefined;
  defaultPrice: number | undefined;
  subscriptionPrices: MappedPricing[] | undefined;

  firstFormGroup = this._formBuilder.group({
    subscription: ['', Validators.required],
    currency: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    startingDate: ['', Validators.required],
  });

  constructor(
    private http: CoursesService,
    private userService: UserService,
    private httpClient: HttpClient,
    private activeRoute: ActivatedRoute,
    private title: Title,
    private _formBuilder: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.userService.isAuthenticated();

    this.enroledCourses = this.store.pipe(
      select(getAppState),
      map((state) => state.userState.user?.enrolled_courses)
    );
  }

  dateFilter = (d: Date | null): boolean => {
    if (!this.enroledCourses) return true;

    const toString = d?.toDateString() || '';

    const dDate = new Date(toString);
    const endDate = new Date();

    let foundDate;

    this.enroledCourses.subscribe((list) => {
      foundDate = list?.find((course) => {
        const stringDate = new Date(course.start_date).toDateString();
        const startDate = new Date(stringDate);

        endDate.setDate(startDate.getDate() + course.duration);

        return dDate >= startDate && dDate <= endDate;
      });
    });

    return !foundDate;
  };

  validateSelectedDate() {
    const dateValue = this.secondFormGroup.value.startingDate;

    if (!dateValue) return;

    const startDate = new Date(dateValue);
    const endDate = new Date();

    endDate.setDate(startDate.getDate() + 7);

    if (this.dateFilter(endDate)) {
      return;
    }

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: "This start date is invalid because of the course's duration. Please, try another one.",
      duration: 5000,
      panelClass: ['snackbar-warn'],
    });

    this.secondFormGroup.controls['startingDate'].setErrors({
      invalidDate: true,
    });
  }

  checkAlreadyEnroled() {
    this.enroledCourses?.subscribe(
      (list) =>
        (this.alreadyEnrolled = !!list?.find((c) => c.id === this.course?.id))
    );
  }

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
    return pricingList.map((course) => ({
      ...course,
      currency: this.getIsoCode(course.currency),
    }));
  }

  getSubscriptionPrices() {
    const foundSubscriptionPrices = this.course?.purchaseOptions.find(
      (option) =>
        option.id === this.firstFormGroup.controls['subscription'].value
    )?.pricing;

    if (foundSubscriptionPrices) {
      this.subscriptionPrices = this.mapPricingList(foundSubscriptionPrices);
      this.defaultPrice = this.subscriptionPrices[0].value;
    }
  }

  handleEnrollment() {
    this.validateSelectedDate();

    if (this.secondFormGroup.invalid) return;

    let mappedUser;

    this.store.subscribe((state) => {
      let user = state.userState.user!;

      if (!user.enrolled_courses) {
        user = { ...user, enrolled_courses: [] };
      }

      mappedUser = {
        ...user,
        enrolled_courses: [
          ...user.enrolled_courses!,
          {
            id: this.course?.id!,
            duration: 7,
            start_date: this.secondFormGroup.value.startingDate!.toString(),
            name: this.course?.name!,
          },
        ],
      };
    });

    if (mappedUser) {
      this.userService.updateUser(mappedUser as unknown as User);
    }
  }

  ngOnInit(): void {
    const courseIdParam = this.activeRoute.snapshot.paramMap.get('courseId');

    this.httpClient.get(env.countriesApi).subscribe((res) => {
      this.countries = res as unknown as CoutryAPI[];
    });

    if (courseIdParam) {
      this.http.getCourse(courseIdParam).subscribe((res) => {
        this.course = res.result;

        this.defaultSubscription = this.course.purchaseOptions[0].id;
        this.coursePrices = this.mapPricingList(this.course.pricing);

        this.subscriptionPrices = this.mapPricingList(
          this.course.purchaseOptions[0].pricing
        );
        this.defaultPrice = this.subscriptionPrices[0].value;

        this.updatePageTitle(this.course.name);

        this.checkAlreadyEnroled();
      });
    }
  }
}
