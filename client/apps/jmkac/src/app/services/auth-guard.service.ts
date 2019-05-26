import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { State, selectors } from '../store';
import * as routerActions from '../store/router/actions'


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectors.session.valid),
      map(pinValid => {
        if (!pinValid) {
          this.store.dispatch(routerActions.ToLogin());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}