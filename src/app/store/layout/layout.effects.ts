import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EventService } from '../../core/event.service';
import { GET_FILTERED_EVENTS, GET_FILTERED_EVENTS_SUCCESS, GET_FILTERED_EVENTS_ERROR } from './layout.actions';


@Injectable()
export class LayoutEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly eventService: EventService
  ) {}

  @Effect()
  getFilteredEvents$ = this.actions$.pipe(
    ofType(GET_FILTERED_EVENTS),
    switchMap((filter: any) => this.eventService.getFilteredEvents(filter.payload)
      .pipe(
        map(res => ({ type: GET_FILTERED_EVENTS_SUCCESS, payload: res })),
        catchError(error => of({ type: GET_FILTERED_EVENTS_ERROR, payload: error }))
      )
    )
  );
}
