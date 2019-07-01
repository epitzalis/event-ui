import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../core/event.service';
import { User } from '../../models/user.model';
import { select, Store } from '@ngrx/store';
import * as layout from '../../store/layout/layout.actions';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'eui-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[];
  selectedEvent: Event;
  slideMyEvents: boolean;
  subscriptionLayout: SubscriptionLike;
  subscriptionLogin: SubscriptionLike;
  isAuthenticated: boolean;

  constructor(
    private readonly eventService: EventService,
    private readonly store: Store<any>,
  ) {}

  ngOnInit() {
    this.getEvents();

    this.subscriptionLayout = this.store.pipe(select('layout')).subscribe(state => {
      if (state && state.filteredEvents) {
        this.events = state.filteredEvents;
        this.selectedEvent = this.events[0];
      }
    });

    this.subscriptionLogin = this.store.pipe(select('login')).subscribe(state => {
      if (state) {
        this.isAuthenticated = state.logged;
      }
    });
  }

  onSelectEvent(event: Event) {
    this.selectedEvent = event;
  }

  getEvents() {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.selectedEvent = events[0];
    });
  }

  myEventsChange() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (this.slideMyEvents && user) {
      const userMail = user.email;
      const filter = 'addedBy=' + userMail;
      const action = new layout.GetFilteredEvents(filter);
      this.store.dispatch(action);
    } else {
      this.getEvents();
    }
  }

  ngOnDestroy() {
    this.subscriptionLayout.unsubscribe();
    this.subscriptionLogin.unsubscribe();
  }

}
