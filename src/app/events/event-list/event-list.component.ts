import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { trigger, style, state, transition, animate } from '@angular/animations';
import * as layout from '../../store/layout/layout.actions';
import { USER } from '../../core/constants';

/**
 * models
 */
import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';

/**
 * services
 */
import { UserService } from '../../core/user.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'eui-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0,
      })),
      transition(':enter', [
        animate(300, style({
          transform: 'translateX(0)',
          opacity: 1,
        }))
      ]),
    ])
  ]
})
/**
 * Class that represent the Event list component in the app
 */
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
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.getEvents();

    // tslint:disable-next-line: no-shadowed-variable
    this.subscriptionLayout = this.store.pipe(select('layout')).subscribe((state) => {
      if (state && state.filteredEvents) {
        this.events = state.filteredEvents;
        this.selectedEvent = this.events[0];
      }
    });

    // tslint:disable-next-line: no-shadowed-variable
    this.subscriptionLogin = this.store.pipe(select('login')).subscribe((state) => {
      if (state) {
        this.isAuthenticated = state.logged;
      }
    });
  }

  /**
   * Mark the event as selected
   *
   * @param event The event
   */
  onSelectEvent(event: Event) {
    this.selectedEvent = event;
  }

  /**
   * Obtain the event list
   */
  getEvents() {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.selectedEvent = events[0];
    });
  }

  /**
   * Fired when the "my events" filter is toggle
   */
  myEventsChange() {
    const user: User = JSON.parse(localStorage.getItem(USER));

    if (this.slideMyEvents && user) {
      const userMail = user.email;
      const filter = 'addedBy=' + userMail;
      const action = new layout.GetFilteredEvents(filter);
      this.store.dispatch(action);
    } else {
      this.getEvents();
    }
  }

  /**
   * After destroy the component we need unsubscribe.
   */
  ngOnDestroy() {
    this.subscriptionLayout.unsubscribe();
    this.subscriptionLogin.unsubscribe();
  }

}
