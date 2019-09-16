import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Event } from '../models/event.model';
import { HTTP_HEADER_VALUE_APPLICATION_JSON, EVENTS } from './constants';

@Injectable()
export class EventService {

  constructor(
    private readonly http: HttpClient,
    ) { }

  /**
   * Return the event list.
   */
  getEvents(): Observable<Event[]> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http.get<Event[]>(`${environment.apiURL}${EVENTS}`, { headers });
  }

  /**
   * Return the event with the ID passed as parameter
   *
   * @param id Event ID
   */
  getEvent(id: string): Observable<Event> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http.get<Event>(`${environment.apiURL}${EVENTS}/${id}`, { headers });
  }

  /**
   * Delete the event, if exists, with the ID passed as parameter
   *
   * @param id  Event ID
   */
  deleteEvent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http.delete(`${environment.apiURL}${EVENTS}/${id}`, { headers });
  }

  /**
   * Save the event passed as parameter
   *
   * @param event Event to add
   */
  addEvent(event: Event): Observable<Event> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http
      .post<Event>(`${environment.apiURL}${EVENTS}/`, event, { headers });
  }

  /**
   * Update the event passed as parameter
   *
   * @param event Event to update
   */
  updateEvent(event: Event): Observable<Event> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http
      .put<Event>(`${environment.apiURL}${EVENTS}/${event.id}`, event, { headers });
  }

  /**
   * Return the event list that match with the filter string
   *
   * @param filter String used to filter
   */
  getFilteredEvents(filter): Observable<any> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http.get(`${environment.apiURL}${EVENTS}?${filter}`, { headers });
  }

}
