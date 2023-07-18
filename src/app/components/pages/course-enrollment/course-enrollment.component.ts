import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/services/@types';
import { CoursesService } from 'src/app/services/courses.service';
import { CoutryAPI } from '@components/@types/countries';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { env } from '@src/environments/env';

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
  coursePrices: MappedPricing[] | undefined;
  countries: CoutryAPI[] | undefined;
  defaultSubscription: string | undefined;
  defaultPrice: number | undefined;
  subscriptionPrices: MappedPricing[] | undefined;

  selected = new FormControl();
  selectedPrice = new FormControl();
  selectFormControl = new FormControl();
  nativeSelectFormControl = new FormControl();

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private http: CoursesService,
    private httpClient: HttpClient,
    private activeRoute: ActivatedRoute,
    private title: Title,
    private _formBuilder: FormBuilder
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
    return pricingList.map((course) => ({
      ...course,
      currency: this.getIsoCode(course.currency),
    }));
  }

  getSubscriptionPrices() {
    const foundSubscriptionPrices = this.course?.purchaseOptions.find(
      (option) => option.id === this.selected.value
    )?.pricing;

    if (foundSubscriptionPrices) {
      this.subscriptionPrices = this.mapPricingList(foundSubscriptionPrices);
      this.defaultPrice = this.subscriptionPrices[0].value;
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

        console.log(this.course);
      });
    }
  }
}
