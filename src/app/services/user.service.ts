import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { env } from '@src/environments/env';
import {
  UserCredentials,
  UserRegister,
  UserWithPassword,
} from './@types/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  getUser,
  getUserError,
  getUserSuccess,
} from '../store/user/user.actions';

export enum UserResponse {
  SUCCESS = 'success',
  ERROR = 'error',
  ALREADY_EXISTS = 'already_exists',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store<AppState>) {}

  public userLogin(user: UserCredentials): UserResponse {
    this.store.dispatch(getUser());

    let foundUser;

    const foundData = localStorage.getItem(env.usersToken);

    if (foundData) {
      const parsedData: UserWithPassword[] = JSON.parse(foundData);

      foundUser = parsedData.find(
        (u) =>
          u.email === u.email &&
          CryptoJS.AES.decrypt(u.password, env.psswdSecret).toString(
            CryptoJS.enc.Utf8
          ) === user.password
      );
    }

    if (foundUser) {
      let { password: _, ...rest } = foundUser;

      this.store.dispatch(getUserSuccess({ user: rest }));

      return UserResponse.SUCCESS;
    }

    this.store.dispatch(getUserError());
    return UserResponse.ERROR;
  }

  public userRegister(user: UserRegister): UserResponse {
    this.store.dispatch(getUser());

    let userList: UserWithPassword[] = [];

    const foundData = localStorage.getItem(env.usersToken);

    if (foundData) {
      userList = JSON.parse(foundData);

      const foundUser = userList.find((u) => u.email && user.email);

      if (foundUser) {
        this.store.dispatch(getUserError());
        return UserResponse.ALREADY_EXISTS;
      }
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
