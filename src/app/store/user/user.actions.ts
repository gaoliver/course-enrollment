import { createAction, props } from '@ngrx/store';
import { User } from '../@types/interfaces';

export enum UserActionTypes {
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  GetUserLogout = '[User] User Logout',
  GetUserError = '[User] Get User Error',
}

export const getUser = createAction(UserActionTypes.GetUser);

export const getUserSuccess = createAction(
  UserActionTypes.GetUserSuccess,
  props<{ user: User }>()
);

export const getUserLogout = createAction(UserActionTypes.GetUserLogout);
export const getUserError = createAction(UserActionTypes.GetUserError);
