import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/event.service';
import { Event } from '../../models/event.model';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';
import { ImagesService } from '../../core/images.service';
import { ID, USER, EVENTS } from '../../core/constants';

@Component({
  selector: 'eui-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
/**
 * Class that represent the event detail component in the app
 */
export class EventDetailComponent implements OnInit {

  event: Event;
  id: string;
  imageUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params[ID];
    this.getImage();
  }

  /**
   * Return the event with the ID is the same that id property
   */
  getEvent() {
    this.eventService.getEvent(this.id).subscribe((event: Event) => {
      this.event = event;
    });
  }

  /**
   * Return a random image from unsplash.com
   */
  getImage() {
    this.imagesService.getImage().subscribe((img) => {
      this.imageUrl = img.urls.small;
      this.getEvent();
    });
  }

  /**
   * Return true if user stored in localStorage is the owner of the event
   *
   * @param event Event to check
   */
  isOwner(event: Event) {
    let isOwner = false;
    const userString = localStorage.getItem(USER);
    if (userString) {
      const user: User = JSON.parse(userString);
      isOwner = event.addedBy === user.email;
    }
    return isOwner;
  }

  /**
   * Delete the event, if exists, with the ID passed as parameter
   *
   * @param id  Event ID
   */
  deleteEvent(event: Event) {
    if (this.userService.checkUser()) {
      this.eventService.deleteEvent(event.id).subscribe(() => {
        this.router.navigate(['/' + EVENTS]);
      });
    }
  }
}
