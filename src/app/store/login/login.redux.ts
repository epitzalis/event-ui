import * as login from './login.actions';

export interface State {
  logged: boolean;
}

export const initialState: State = {
  logged: false
};

export function reducer(state: State = initialState, action: login.Actions): State {

  if (action.type === login.LOGGED) {
    return {
      ...state,
      logged: action.payload
    };
  } else {
    return state;
  }
}
