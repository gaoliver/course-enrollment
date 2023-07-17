import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { CoursesComponent } from './components/pages/courses/courses.component';
import { HistoryComponent } from './components/pages/history/history.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    component: SignupComponent,
  },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
