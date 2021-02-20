import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  jsonUrl: string = 'http://localhost:3000/events';
  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  // private list: Event[] = [
  //   {
  //     id: 1,
  //     name: 'Angular Connect',
  //     date: '9/26/2036',
  //     time: '10am',
  //     location: { address: '1 London Rd', city: 'London', country: 'England' }
  //   },
  //   {
  //     id: 2,
  //     name: 'ng-nl',
  //     date: '4/15/2037',
  //     time: '9am',
  //     location: { address: '127 DT ', city: 'Amsterdam', country: 'NL' }
  //   },
  //   {
  //     id: 3,
  //     name: 'ng-conf 2037',
  //     date: '4/15/2037',
  //     time: '9am',
  //     location: { address: 'The Palatial America Hotel', city: 'Salt Lake City', country: 'USA' }
  //   },
  //   {
  //     id: 4,
  //     name: 'UN Angular Summit',
  //     date: '6/10/2037',
  //     time: '8am',
  //     location: { address: 'The UN Angular Center', city: 'New York', country: 'USA' }
  //   },
  // ];

  // list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(this.list);

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): void {
    this.http.get<Event[]>(this.jsonUrl).subscribe(
      events => this.list$.next(events)
    );
  }

  create(event: Event): void {
    this.http.post<Event>(this.jsonUrl, event).subscribe(
      () => this.getAll()
    );
  }

  update(event: Event): void {
    this.http.patch<Event>(`${this.jsonUrl}/${event.id}`, event).subscribe(
      () => this.getAll()
    );
  }

  remove(event: Event): void {
    this.http.delete<Event>(`${this.jsonUrl}/${event.id}`).subscribe(
      () => this.getAll()
    );
  }

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (id===0) {
      return of(new Event());
    }
    return this.http.get<Event>(`${this.jsonUrl}/${id}`);

  }

}
