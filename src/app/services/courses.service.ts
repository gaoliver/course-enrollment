import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, CoursesListResponse } from './@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<APIResponse<CoursesListResponse>> {
    return this.http.get<CoursesListResponse>(
      'https://dev.burnwood.aihr.com/catalog/api/Product?api-version=1.0'
    ) as any;
  }
}
