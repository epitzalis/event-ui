import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/event.service';
import { Event } from '../../models/event.model';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'eui-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {

  event: Event;
  id: string;

  private readonly PARAM_ID = 'id';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly userService: UserService,
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

  isOwner(event: Event) {
    let isOwner = false;
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      if (user) {
        isOwner = event.addedBy === user.email;
      }
    }
    return isOwner;
  }

  deleteEvent(event: Event) {
    if (this.userService.checkUser()) {
      this.eventService.deleteEvent(event.id).subscribe(() => {
      });
    }
    this.router.navigate(['/events']);
  }
}
