import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'eui-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[];
  selectedEvent: Event;


  constructor(
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.selectedEvent = events[0];
    });
  }

  ngOnDestroy() {
  }

}
