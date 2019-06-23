import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/event.service';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { UserService } from '../../core/user.service';
import { User } from 'src/app/models/user';

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
    private router: Router,
    private eventService: EventService,
    private userService: UserService,
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
    const user: User = JSON.parse(localStorage.getItem('user'));
    let isOwner = false;
    if (user) {
      isOwner = event.addedBy === user.email;
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
