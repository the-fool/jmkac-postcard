import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable, Subject } from 'rxjs'
import { ConnectPostcards } from '../store/postcards/actions'
import { Store } from '@ngrx/store'
import { State, selectors } from '../store'
import { Postcard } from '../store/postcards/models'
import { debounce, debounceTime } from 'rxjs/operators';

declare const d3

@Component({
  templateUrl: 'tpl.html',
  styleUrls: ['style.styl'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPage implements OnInit {
  postcards: Observable<Postcard[]>
  data: Postcard[] = []
  updater = new Subject()

  ngOnInit() {
    this.store.dispatch(ConnectPostcards())
    this.postcards = this.store.select(selectors.postcards.collection)

    this.postcards.subscribe(d => {
      this.data = d.map(p => ({...p}))
      this.setPinData()
    })

    this.updater.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.update()
    })
  }
  
  update() {
    console.log(this.data)
  }

  setPinData() {
    const svg = d3.select('svg')
    const updater = this.updater
    svg
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 20)
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

    function dragstarted() {
      d3.select(this)
        .raise()
        .classed('active', true)
    }

    function dragged(d) {
      d3.select(this)
        .attr('cx', (d.x = d3.event.x))
        .attr('cy', (d.y = d3.event.y))
      
      updater.next()
    }

    function dragended() {
      d3.select(this).classed('active', false)
    }
  }
  constructor(private store: Store<State>) {}
}
