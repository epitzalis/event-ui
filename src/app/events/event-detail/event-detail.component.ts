import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'eui-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {

  PARAM_ID = 'id';

  event: Event;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params[this.PARAM_ID];
    this.getEvent();
  }

  getEvent() {
    this.eventService.getEvent(this.id).subscribe((event: Event) => {
      this.event = event;
    });
  }
}
