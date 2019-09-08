import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';
import { EventService } from '../../core/event.service';
import { UserService } from '../../core/user.service';

/**
 * Store mock for tests
 */
const storeMock = {
  pipe: () => of({
    filteredEvents: [],
    logged: true,
  }),
  dispatch: jasmine.createSpy(),
};

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        EventListComponent,
      ],
      providers: [
        EventService,
        UserService,
        {
          provide: Store,
          useValue: storeMock,
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pipe store should not return anything', () => {
    component.isAuthenticated = true;
    const store = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store, 'pipe').and.returnValue(of(null));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeTruthy();
  });

/**
 * try to change the selected event
 */
  it('onSelectEvent changes the selectedEvent variable', () => {
    component.selectedEvent = null;
    const mockEvent: Event = {
      id: '0',
      title: 'event title',
      location: 'event location',
      date: new Date(),
      description: 'event description',
      addedBy: 'event author',
    };
    component.onSelectEvent(mockEvent);
    expect(component.selectedEvent).toEqual(mockEvent);
  });

  it('getEvents subscribe return values', () => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const spy = spyOn(eventService, 'getEvents').and.callFake( () => {
      return of([null, null]);
    });
    component.getEvents();
    expect(spy).toHaveBeenCalled();
    expect(component.selectedEvent).toBeNull();
  });

  it('myEventsChange call getEvents() when user is null', () => {
    spyOn(localStorage, 'getItem').and.callFake( () => null);
    const eventService = fixture.debugElement.injector.get(EventService);
    const spy = spyOn(eventService, 'getEvents').and.callFake( () => {
      return of([null, null]);
    });
    component.myEventsChange();
    expect(spy).toHaveBeenCalled();
  });

/**
 * when user exist should call dispatch
 */
  it('myEventsChange call dispatch when exist user', () => {
    const mockUser: User = {
      id: '0',
      email: 'email@mock.com',
      password: null,
    };
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    const store = fixture.debugElement.injector.get(Store);
    component.slideMyEvents = true;
    component.myEventsChange();
    expect(store.dispatch).toHaveBeenCalled();
  });

});
