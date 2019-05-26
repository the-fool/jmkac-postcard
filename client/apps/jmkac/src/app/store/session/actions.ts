import { createAction, props } from '@ngrx/store'

export const submitPinClicked = createAction(
    '[Session] Submit Pin Clicked',
    props<{pin: number}>()
)

export const pinSucceded = createAction(
    '[Session] Pin Success',
    props<{pin: number}>()
)

export const pinFailed = createAction(
    '[Session] Pin Fail',
    props<{pin: number}>()
)
