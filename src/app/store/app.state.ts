import { UserState, userReducer } from './user/user.reducer';

export interface AppState {
  userState: UserState;
}

export const appReducer = {
  userState: userReducer,
};
