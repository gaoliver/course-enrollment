import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CoursesComponent } from './components/pages/courses/courses.component';
import { HistoryComponent } from './components/pages/history/history.component';
import { CourseEnrollmentComponent } from './components/pages/course-enrollment/course-enrollment.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

export const navbar: Routes = [
  {
    path: 'courses',
    title: 'Courses',
    component: CoursesComponent,
  },
  {
    path: 'enrollment-history',
    title: 'History',
    component: HistoryComponent,
  },
];

export const mobileNav: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  ...navbar,
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
  },
]

export const routes: Routes = [
  ...mobileNav,
  {
    path: 'sign-in',
    title: 'Sign In',
    component: SigninComponent,
  },

  {
    path: 'courses/:courseId/enrollment',
    title: 'Course: ',
    component: CourseEnrollmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
