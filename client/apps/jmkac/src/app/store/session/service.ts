import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  loginUrl = 'https://us-central1-jmkac-postcard.cloudfunctions.net/login';
  constructor(private http: HttpClient) {}

  checkPin(pin: number): Observable<boolean> {
    return this.http.post(this.loginUrl, { pin }).pipe(
      mapTo(true),
      catchError(() => of(false))
    );
  }
}
