import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { mapTo, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkPin(pin: number): Observable<boolean> {
    return this.http.get('http://google.com', {params: {pin: `${pin}`}}).pipe(
        mapTo(true),
        catchError(() => of(false))
    )
  }
}