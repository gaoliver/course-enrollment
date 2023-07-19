export interface User {
  id: string;
  name: string;
  email: string;
  enrolled_courses?: EnrolledCourse[];
}

export interface EnrolledCourse {
  id: string;
  name: string;
  duration: number;
  start_date: string;
  end_date: string;
}
