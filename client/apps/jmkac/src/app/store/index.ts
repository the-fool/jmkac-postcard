import { InjectionToken } from '@angular/core'
import {
  ActionReducerMap,
  Action,
  ActionReducer,
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store'
import * as fromPostcards from './postcards/reducer'
import * as fromSession from './session/reducer'
import { environment } from '../../environments/environment'
import * as sessionSelectors from './session/selectors'
import { RouterEffects } from './router/effects'
import { SessionEffects } from './session/effects'
import { PostcardEffects } from './postcards/effects'

export interface State {
  session: fromSession.State
  postcards: fromPostcards.State
}

export const REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root Reducer Token',
  {
    factory: () => ({
      session: fromSession.reducer,
      postcards: fromPostcards.reducer
    })
  }
)

export const EFFECTS = [RouterEffects, SessionEffects, PostcardEffects]

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action)
    console.groupCollapsed(action.type)
    console.log('prev state', state)
    console.log('action', action)
    console.log('next state', result)
    console.groupEnd()

    return result
  }
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : []

const selectSession = createFeatureSelector<State, fromSession.State>(
  'session'
)

const selectPostcards = createFeatureSelector<State, fromPostcards.State>(
  'postcards'
)

export const selectors = {
  session: {
    valid: createSelector(
      selectSession,
      sessionSelectors.valid
    ),
    status: createSelector(
      selectSession,
      sessionSelectors.status
    )
  },
  postcards: {
    collection: createSelector(
      selectPostcards,
      fromPostcards.selectors.collection
    ),
    connected: createSelector(
      selectPostcards,
      fromPostcards.selectors.connected
    )
  }
}
