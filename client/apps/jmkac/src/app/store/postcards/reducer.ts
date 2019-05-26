import { Postcard } from './models'
import { createReducer, on } from '@ngrx/store'
import * as actions from './actions'

export interface State {
  connected: boolean
  postcards: Postcard[]
}

const initialState: State = {
  connected: false,
  postcards: []
}

export const reducer = createReducer(
  initialState,

  on(actions.FetchPostcardsSucceeded, (state, { postcards }) => ({
    ...state,
    postcards
  }))
)

export const selectors = {
    collection: (s: State) => s.postcards,
    connected: (s: State) => s.connected
}