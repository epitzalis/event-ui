import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import * as login from '../store/login/login.actions';
import { USER, USERS } from './constants';

@Injectable()
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<any>,
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
      .post(`${environment.apiURL}${USERS}/`, user, { headers })
      .pipe(
        map(r => {
          localStorage.setItem(USER, JSON.stringify(r));
          this.setUser();
        }),
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

    return this.http.get(`${environment.apiURL}${USERS}?email=${user.email}`, { headers }).pipe(
      map(us => {
        if (us[0].email && us[0].password === user.password) {
          localStorage.setItem(USER, JSON.stringify(us[0]));
          this.setUser();
        }
        return us[0].password === user.password ? us[0] : 'Password not valid.';
      }),
    );
  }

  /**
   * Log out the user in the system
   */
  logout() {
    localStorage.setItem(USER, '');
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
    this.isAuthenticated = Boolean(localStorage.getItem(USER));
    this.isAuthenticated ? this.store.dispatch(new login.Logged(true)) : this.store.dispatch(new login.Logged(false));
  }

}
