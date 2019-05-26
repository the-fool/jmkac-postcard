import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectors } from '../store';
import { submitPinClicked } from '../store/session/actions';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Validity } from '../store/session/reducer';

@Component({
  templateUrl: 'tpl.html',
  styleUrls: ['style.styl']
})
export class LoginPage implements OnInit {
  pin: number;
  status$: Observable<string>

  ngOnInit() {
    this.status$ = this.store.pipe(
      select(selectors.session.status),
      map(s => s === Validity.Unknown ? '' : s === Validity.Failed ? 'Incorrect Pin' : 'Logged in! Taking you home.')
    )
  }
  submit() {
    this.store.dispatch(submitPinClicked({ pin: this.pin }));
  }

  constructor(private store: Store<State>, private actions$: Actions) {}
}
