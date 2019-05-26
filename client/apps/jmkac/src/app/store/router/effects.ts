import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToLogin, ToAdmin } from './actions';

@Injectable()
export class RouterEffects {
  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToLogin),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  )

  homeRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToAdmin),
        tap(() => {
          this.router.navigate(['/admin']);
        })
      ),
    { dispatch: false }
  )
  constructor(private actions$: Actions, private router: Router) {}
}
