import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Course, CoursesListResponse } from './@types/apiResponses';

type GetCourseParams = {
  page?: number;
  filters?: string;
  sorts?: string;
};

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  public getCourses(
    params?: GetCourseParams
  ): Observable<APIResponse<CoursesListResponse>> {
    return this.http.get<CoursesListResponse>(
      `https://dev.burnwood.aihr.com/catalog/api/Product?filters=${
        params?.filters || ''
      }&sorts=${params?.sorts || ''}&page=${
        params?.page || 1
      }&pagesize=15&api-version=1.0`
    ) as any;
  }

  public getCourse(courseId: string): Observable<APIResponse<Course>> {
    return this.http.get<Course>(
      `https://dev.burnwood.aihr.com/catalog/api/Product/${courseId}?api-version=1.0`
    ) as any;
  }
}
