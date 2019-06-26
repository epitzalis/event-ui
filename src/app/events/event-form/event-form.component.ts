import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Event } from '../../models/event';
import { EventService } from '../../core/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'eui-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  PARAM_ID = 'id';

  addEditForm: FormGroup;
  event: Event;

  constructor(
    private readonly fb: FormBuilder,
    private readonly eventService: EventService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params[this.PARAM_ID];

    if (id) {
      this.eventService.getEvent(id).subscribe((event: Event) => {
        this.event = event;
        this.createForm();
      });
    } else {
      this.createForm();
    }
  }

  createForm() {
    if (this.event) {
      this.addEditForm = this.fb.group({
        title: this.event.title,
        location: this.event.location,
        date: this.event.date,
        description: this.event.description,
        addedBy: this.event.addedBy,
        id: this.event.id
      });
    } else {
      this.addEditForm = this.fb.group({
        title: '',
        location: '',
        date: '',
        description: '',
        addedBy: '',
        id: ''
      });
    }
  }

  onSubmit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.event = this.addEditForm.value;
    this.event.addedBy = user.email;
    if (this.event.id) {
      this.eventService.updateEvent(this.event).subscribe((event: Event) => {
        this.addEditForm.reset();
        this.router.navigate(['/events']);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe((event: Event) => {
        this.addEditForm.reset();
        this.router.navigate(['/events']);
      });
    }
  }
}
