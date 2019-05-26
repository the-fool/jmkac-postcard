import { State, Validity, LoadingState } from './reducer'

export const pin = (s: State) => s.pin
export const valid = (s: State) => s.validity === Validity.Succeeded
export const status = (s: State) => s.validity 
export const busy = (s: State) => s.loadingState === LoadingState.Busy
