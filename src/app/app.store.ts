import { ActionReducerMap } from '@ngrx/store';

import * as loginReducer from './store/login/login.redux';

export interface State {
  login: loginReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer.reducer,
};
