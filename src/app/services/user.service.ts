import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { env } from '@src/environments/env';
import {
  UserCredentials,
  UserRegister,
  UserWithPassword,
} from './@types/interfaces';

export enum UserResponse {
  SUCCESS = 'success',
  ERROR = 'error',
  ALREADY_EXISTS = 'already_exists',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  public userLogin(user: UserCredentials): UserResponse {
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
      console.log(foundUser);
      return UserResponse.SUCCESS;
    }

    return UserResponse.ERROR;
  }

  public userRegister(user: UserRegister): UserResponse {
    let userList: UserWithPassword[] = [];

    const foundData = localStorage.getItem(env.usersToken);

    if (foundData) {
      console.log(foundData);
      userList = JSON.parse(foundData);

      const foundUser = userList.find((u) => u.email && user.email);

      if (foundUser) return UserResponse.ALREADY_EXISTS;
    }

    user.password = CryptoJS.AES.encrypt(
      user.password,
      env.psswdSecret
    ).toString();

    userList.push(user);

    const stringList = JSON.stringify(userList);

    localStorage.setItem(env.usersToken, stringList);

    return UserResponse.SUCCESS;
  }
}
