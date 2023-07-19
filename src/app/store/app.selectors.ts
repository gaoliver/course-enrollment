import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const getAppState = (state: AppState) => state;

export const getAppSelector = createSelector(
  getAppState,
  (state: AppState) => state
);
