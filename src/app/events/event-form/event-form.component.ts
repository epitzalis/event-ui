import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    const titleValue = this.event ? this.event.title : '';
    const locationValue = this.event ? this.event.location : '';
    const dateValue = this.event ? this.event.date : '';
    const descriptionValue = this.event ? this.event.description : '';
    const addedByValue = this.event ? this.event.addedBy : '';
    const idValue = this.event ? this.event.id : '';

    this.addEditForm = this.fb.group({
      title: [titleValue, [Validators.required]],
      location: [locationValue, [Validators.required, Validators.minLength(2),
                                  Validators.maxLength(25)]],
      date: [dateValue, [Validators.required]],
      description: [descriptionValue, [Validators.required, Validators.minLength(10),
                                        Validators.maxLength(400)]],
      addedBy: [addedByValue, []],
      id: [idValue, []],
    });
  }

  getError(name: string, field: any): string {
    if (field.errors) {
      if (field.errors.required) {
        return `${name} is required`;
      } else if (field.errors.minlength) {
        return `${name} min length is ${field.errors.minlength.requiredLength}`;
      } else if (field.errors.maxlength) {
        return `${name} max length is ${field.errors.maxlength.requiredLength}`;
      }
    }
    return '';
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
