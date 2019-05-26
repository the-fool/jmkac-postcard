import { createReducer, on } from '@ngrx/store';
import { Session, BLANK_SESSION } from './models';
import * as actions from './actions';

export enum LoadingState {
  Idle,
  Busy
}

export enum Validity {
  Unknown,
  Failed,
  Succeeded
}

export interface State extends Session {
  loadingState: LoadingState
  validity: Validity
}

export const initialState: State = {
  ...BLANK_SESSION,
  loadingState: LoadingState.Idle,
  validity: Validity.Unknown
};

export const reducer = createReducer(
  initialState,

  on(actions.submitPinClicked, (state, { pin }) => ({
    ...state,
    pin,
    loadingState: LoadingState.Busy,
    validity: Validity.Unknown
  })),

  on(actions.pinSucceded, (state, { pin }) => ({
    ...state,
    pin,
    loadingState: LoadingState.Idle,
    validity: Validity.Succeeded
  })),

  on(actions.pinFailed, (state, { pin }) => ({
    ...state,
    pin,
    loadingState: LoadingState.Idle,
    validity: Validity.Failed
  }))
)


