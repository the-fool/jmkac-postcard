import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Postcard } from './models';

const DUMMY: Postcard[] = [
    {
        x: 10,
        y: 34,
        img: 'wut'
    },
    {
        x: 100,
        y: 34,
        img: 'wut'
    },
    {
        x: 20,
        y: 134,
        img: 'wut'
    },
]
@Injectable({
    providedIn: 'root'
})
export class PostcardService {
    private connected = false

    getAll() {
        return of()
    }

    connect(): Observable<Postcard[]> {
        if (this.connected) {
            throw 'Already connected!'
        }
        this.connected = true
        return of(DUMMY)
    }
}