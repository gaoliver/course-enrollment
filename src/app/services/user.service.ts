import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { User } from '../store/@types/interfaces';
import { env } from '@src/environments/env';

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

  public userLogin(user: UserCredentials): GetUserResponse {
    let foundUser;

    const foundData = localStorage.getItem(env.usersToken);

    if (foundData) {
      const parsedData: UserWithPassword[] = JSON.parse(foundData);

      foundUser = parsedData.find(
        (u) =>
          u.email === u.email &&
          CryptoJS.AES.decrypt(u.password, env.psswdSecret).toString() ===
            user.password
      );
    }

    if (foundUser) {
      return GetUserResponse.SUCCESS;
    }

    return GetUserResponse.ERROR;
  }

  public userRegister(user: UserWithPassword): GetUserResponse {
    let userList: UserWithPassword[] = [];

    const foundData = localStorage.getItem(env.usersToken);

    if (foundData) {
      userList = JSON.parse(foundData);

      const foundUser = userList.find((u) => u.email && user.email);

      if (foundUser) return GetUserResponse.ALREADY_EXISTS;
    }

    user.password = CryptoJS.AES.encrypt(
      user.password,
      env.psswdSecret
    ).toString();

    const stringList = JSON.stringify(userList.push(user));

    localStorage.setItem(env.usersToken, stringList);

    return GetUserResponse.SUCCESS;
  }
}
