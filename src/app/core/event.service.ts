import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Event } from '../models/event.model';
import { HTTP_HEADER_VALUE_APPLICATION_JSON } from './constants-service';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';

@Injectable()
export class EventService {
  constructor(
    private readonly http: HttpClient,
    private readonly errorService: ErrorService,
    ) {}

  /**
   * Return the event list.
   */
  getEvents(): Observable<any> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http.get(environment.apiURL + 'events', { headers }).pipe(
      retry(3),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Return the event with the ID passed as parameter
   *
   * @param id Event ID
   */
  getEvent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http.get(`${environment.apiURL}events/${id}`, { headers }).pipe(
      retry(3),
      catchError(this.errorService.handleError)
    );
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

    return this.http
      .delete(`${environment.apiURL}events/${id}`, { headers })
      .pipe(
        retry(3),
        catchError(this.errorService.handleError)
      );
  }

  /**
   * Save the event passed as parameter
   *
   * @param event Event to add
   */
  addEvent(event: Event): Observable<any> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http
      .post(environment.apiURL + 'events/', event, { headers })
      .pipe(
        retry(3),
        catchError(this.errorService.handleError)
      );
  }

  /**
   * Update the event passed as parameter
   *
   * @param event Event to update
   */
  updateEvent(event: Event): Observable<any> {
    const headers = new HttpHeaders({
      HTTP_HEADER_KEY_CONTENT_TYPE : HTTP_HEADER_VALUE_APPLICATION_JSON
    });

    return this.http
      .put(`${environment.apiURL}events/${event.id}`, event, { headers })
      .pipe(
        retry(3),
        catchError(this.errorService.handleError)
      );
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

    return this.http.get(`${environment.apiURL}events?${filter}`, { headers }).pipe(
      retry(3),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Return true if user stored in localStorage is the owner of the event
   *
   * @param event Event to check
   */
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

}
