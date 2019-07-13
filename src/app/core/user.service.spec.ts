import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { UserService } from './user.service';
import { ErrorService } from './error.service';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  const storeMock = {
    dispatch: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        ErrorService,
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
    // Check that there aren't pending requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});
