import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../models/event';
import { User } from '../../models/user.model';
import { ValidateFormService } from '../../core/validate-form.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'eui-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
/**
 * Class that represent the event form component in the app
 */
export class EventFormComponent implements OnInit {

  addEditForm: FormGroup;
  event: Event;

  private readonly PARAM_ID = 'id';

  constructor(
    public readonly validateFormService: ValidateFormService,
    private readonly fb: FormBuilder,
    private readonly eventService: EventService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
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

  /**
   * Crate the form used to insert events
   */
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

  /**
   * Fired when user click on "Create" button of the form
   */
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
