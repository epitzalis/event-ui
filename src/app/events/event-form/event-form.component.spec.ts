import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { EventFormComponent } from './event-form.component';
import { ValidateFormService } from '../../core/validate-form.service';
import { EventService } from '../../core/event.service';
import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';


describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  /**
   * mock data
   */
  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => null
      },
    },
  };

  const mockUser: User = {
    id: '0',
    email: 'email@mock.com',
    password: null,
  };

  const mockEvent: Event = {
    title: 'title event',
    location: 'location event',
    date: new Date(),
    description: 'description event',
    addedBy: 'email@mock.com',
    id: '1',
  };

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [
        EventFormComponent,
      ],
      providers: [
        ValidateFormService,
        Location,
        EventService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createForm instance addEditForm when create event', () => {
    component.createForm();
    expect(component.addEditForm).toBeTruthy();
  });

  it('onCancel execute location.back()', () => {
    const location = TestBed.get(Location);
    const spy = spyOn(location, 'back');
    component.onCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('createForm instance addEditForm when edit event', () => {
    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    const eventService = fixture.debugElement.injector.get(EventService);
    const spy = spyOn(eventService, 'getEvent').and.callFake( () => of(mockEvent));
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.callFake( () => 1 as any);
    component.ngOnInit();
    expect(component.addEditForm).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(component.event).toEqual(mockEvent);
  });

  /**
   * onSubmit call addEvent and navigate
   */
  it('onSubmit execute addEvent correctly', () => {
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    const eventService = fixture.debugElement.injector.get(EventService);
    const routerService = fixture.debugElement.injector.get(Router);
    const spy1 = spyOn(eventService, 'addEvent').and.callFake( () => of(null));
    const spy2 = spyOn(routerService, 'navigate').and.callFake( () => null);
    component.addEditForm.reset();
    component.onSubmit();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  /**
   * onSubmit call updateEvent and navigate
   */
  it('onSubmit execute updateEvent correctly', () => {
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    const eventService = fixture.debugElement.injector.get(EventService);
    const routerService = fixture.debugElement.injector.get(Router);
    const spy1 = spyOn(eventService, 'updateEvent').and.callFake( () => of(null));
    const spy2 = spyOn(routerService, 'navigate').and.callFake( () => null);
    component.addEditForm.setValue(mockEvent);
    component.onSubmit();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

});
