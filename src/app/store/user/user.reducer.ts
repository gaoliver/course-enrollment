import { createReducer, on } from '@ngrx/store';
import { User } from '../@types/interfaces';
import { getUser, getUserError, getUserLogout, getUserSuccess } from './user.actions';

export interface UserState {
  user: User | undefined;
  status: 'loading' | 'error' | 'success' | undefined;
}

export const initialState: UserState = {
  user: undefined,
  status: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(getUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success' as const,
  })),
  on(getUserError, (state) => ({
    ...state,
    status: 'error' as const,
  })),
  on(getUserLogout, (state) => ({
    ...state,
    user: undefined
  }))
);
