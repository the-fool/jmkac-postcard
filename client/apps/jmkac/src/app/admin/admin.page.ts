import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { pinSucceded } from '../store/session/actions';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: 'tpl.html',
  styleUrls: ['style.styl']
})
export class AdminPage implements OnInit {
  constructor(private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(
      ofType(pinSucceded),
      take(1)
    );
  }
}
