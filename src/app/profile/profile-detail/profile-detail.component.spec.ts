import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProfileDetailComponent } from './profile-detail.component';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';

describe('ProfileDetailComponent', () => {
  let component: ProfileDetailComponent;
  let fixture: ComponentFixture<ProfileDetailComponent>;

  /**
   * store mock
   */
  const storeMock = {
    dispatch: jasmine.createSpy(),
  };

  const mockUser: User = {
    id: '0',
    email: 'email@mock.com',
    password: null,
  };

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        ProfileDetailComponent
      ],
      providers: [
        UserService,
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUser get user login', () => {
    component.getUser();
    expect(component.user).toEqual(mockUser);
  });

  /**
   * when logout the page redirect to home
   */
  it('logout execute userService.logout() and navigate', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const routerService = fixture.debugElement.injector.get(Router);

    const spy1 = spyOn(userService, 'logout').and.callFake( () => null);
    const spy2 = spyOn(routerService, 'navigate').and.callFake( () => null);

    component.logout();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
