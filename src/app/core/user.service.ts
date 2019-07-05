import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import * as login from '../store/login/login.actions';

@Injectable()
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<any>
  ) {}

  isAuthenticated: boolean;

  /**
   * Sign up the user
   *
   * @param user User to sign up
   */
  signup(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(environment.apiURL + 'users/', user, { headers })
      .pipe(
        retry(3),
        map(r => {
          localStorage.setItem('user', JSON.stringify(r));
          this.setUser();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Log in user in the system if the password is correct.
   *
   * If the password is incorrect return a string message
   *
   * @param user Use to log in
   */
  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${environment.apiURL}users?email=${user.email}`, { headers }).pipe(
      retry(3),
      map(us => {
        if (us[0].email && us[0].password === user.password) {
          localStorage.setItem('user', JSON.stringify(us[0]));
          this.setUser();
        }
        return us[0].password === user.password ? us[0] : 'Password not valid.';
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Log out the user in the system
   */
  logout() {
    localStorage.setItem('user', '');
    return false;
  }

  /**
   * Return true if user is authenticated, false in other case.
   */
  checkUser(): boolean {
    this.setUser();
    return this.isAuthenticated;
  }

  /**
   * Determine if user is authenticated and then set result in isAuthenticated properti
   */
  private setUser() {
    this.isAuthenticated = true;
    this.isAuthenticated = Boolean(localStorage.getItem('user'));
    this.isAuthenticated ? this.store.dispatch(new login.Logged(true)) : this.store.dispatch(new login.Logged(false));
  }

  /**
   * Trace in the console different kinds of errors (Http or others) and then throw a generic error.
   *
   * @param error The HttpErrorResponse error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
