import { Injectable } from '@angular/core';
import { User } from '../store/@types/interfaces';

const USERS_TOKEN = 'Users';

export interface UserCredentials {
  email: string;
  password: string;
}

interface UserWithPassword extends User {
  password: string;
}

enum GetUserResponse {
  SUCCESS = 'success',
  ERROR = 'error',
  ALREADY_EXISTS = 'already_exists',
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  public getUser(user: UserCredentials): GetUserResponse {
    let foundUser;

    const foundData = localStorage.getItem(USERS_TOKEN);

    if (foundData) {
      const parsedData: UserWithPassword[] = JSON.parse(foundData);

      foundUser = parsedData.find(
        (u) => u.email === u.email && u.password === user.password
      );
    }

    if (foundUser) {
      return GetUserResponse.SUCCESS;
    }

    return GetUserResponse.ERROR;
  }

  public userResister(user: UserWithPassword): GetUserResponse {
    const foundData = localStorage.getItem(USERS_TOKEN);

    if (!foundData) {
      const stringUserList = JSON.stringify([user]);

      localStorage.setItem(USERS_TOKEN, stringUserList);

      return GetUserResponse.SUCCESS;
    }

    const parsedData: UserWithPassword[] = JSON.parse(foundData);
    const foundUser = parsedData.find((u) => u.email && user.email);

    if (foundUser) return GetUserResponse.ALREADY_EXISTS;

    const stringUserList = JSON.stringify(parsedData.push(user));
    localStorage.setItem(USERS_TOKEN, stringUserList);

    return GetUserResponse.SUCCESS;
  }
}
