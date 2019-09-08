import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  /**
   * mock data
   */
  const storeMock = {
    dispatch: () => true,
  };

  const mockUser: User = {
    id: '0',
    email: 'email@mock.com',
    password: '',
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
        UserService,
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(UserService);
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

  it('signup is a request type POST', () => {
    service.signup(mockUser).subscribe();
    const req = httpMock.expectOne(environment.apiURL + 'users/');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('login is login is correct', () => {

    const spy = spyOn<any>(service, 'setUser');
    const mockResponse = [];
    mockResponse.push({...mockUser});

    service.login(mockUser).subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiURL}users?email=${mockUser.email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(spy).toHaveBeenCalled();
  });

  it('login is login is incorrect', () => {
    const spy = spyOn<any>(service, 'setUser');
    const mockResponse = [];
    mockResponse.push({...mockUser});
    const mockUser2: User = {
      id: '0',
      email: 'email@mock.com',
      password: null,
    };

    service.login(mockUser2).subscribe((user: any) => {
      expect(user).toBe('Password not valid.');
    });

    const req = httpMock.expectOne(`${environment.apiURL}users?email=${mockUser.email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(spy).not.toHaveBeenCalled();
  });

  it('logout reser user in storage and return false', () => {
    const spy = spyOn(localStorage, 'setItem');

    expect(service.logout()).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('checkUser execute setUser and return undefined', () => {
    const spy = spyOn<any>(service, 'setUser');
    expect(service.checkUser()).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });

  it('checkUser execute setUser and return false', () => {
    service.logout();
    expect(service.checkUser()).toBeFalsy();
  });

});
