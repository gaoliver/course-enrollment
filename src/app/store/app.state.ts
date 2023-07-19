import { UserState, userReducer } from './user/user.reducer';

export interface AppState {
  user: UserState;
}

export const appReducer = {
  userState: userReducer,
};
