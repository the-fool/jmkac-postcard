import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';
import * as actions from './actions';

import * as routerActions from '../router/actions';
import { SessionService } from './service';

@Injectable()
export class SessionEffects {
  submitPin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.submitPinClicked),
      switchMap(({ pin }) =>
        this.svc
          .checkPin(pin)
          .pipe(
            map(x =>
              x ? actions.pinSucceded({ pin }) : actions.pinFailed({ pin })
            )
          )
      )
    )
  );

  pinSubmitSucceed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pinSucceded),
      delay(3000),
      map(() => routerActions.ToAdmin())
    )
  );

  constructor(private actions$: Actions, private svc: SessionService) {}
}
