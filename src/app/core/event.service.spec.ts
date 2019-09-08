import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { EventService } from './event.service';
import { Event } from '../models/event.model';

describe('EventService', () => {

  let service: EventService;
  let httpMock: HttpTestingController;

  /**
   * mock data
   */
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        EventService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(EventService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  afterEach(() => {
    /**
     * Check that there aren't pending requests
     */
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEvents get events', () => {
    service.getEvents().subscribe((events: Event[]) => {
      expect(events.length).toBe(0);
    });

    const req = httpMock.expectOne(environment.apiURL + 'events');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getEvent get a event', () => {
    const idEvent = '1';
    service.getEvent(idEvent).subscribe((event: Event) => {
      expect(event).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(`${environment.apiURL}events/${idEvent}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });

  it('deleteEvent delete a event', () => {
    const idEvent = '1';
    service.deleteEvent(idEvent).subscribe((resp: any) => {
      expect(resp).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiURL}events/${idEvent}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('true');
  });

  it('addEvent create a event', () => {
    service.addEvent(mockEvent).subscribe((event: Event) => {
      expect(event).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(environment.apiURL + 'events/');
    expect(req.request.method).toBe('POST');
    req.flush(mockEvent);
  });

  it('updateEvent update a event', () => {
    service.updateEvent(mockEvent).subscribe((event: Event) => {
      expect(event).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(`${environment.apiURL}events/${mockEvent.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEvent);
  });


  it('getFilteredEvents get events', () => {
    const filter = '1421';
    service.getFilteredEvents(filter).subscribe((events: Event[]) => {
      expect(events.length).toBe(0);
    });

    const req = httpMock.expectOne(`${environment.apiURL}events?${filter}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

});
