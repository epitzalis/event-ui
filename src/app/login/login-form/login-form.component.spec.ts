import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginFormComponent } from './login-form.component';
import { ValidateFormService } from '../../core/validate-form.service';
import { UserService } from '../../core/user.service';
import { GetFilteredEventsSuccess,
        GetFilteredEventsError } from '../../store/layout/layout.actions';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  const mockUserService = {
    login: () => of({ email: 'email@mock.com' }),
  };

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [
        LoginFormComponent
      ],
      providers: [
        ValidateFormService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getFilteredEventsSuccess = new GetFilteredEventsSuccess([]);
    const getFilteredEventsError = new GetFilteredEventsError([]);
    expect(getFilteredEventsSuccess).toBeTruthy();
    expect(getFilteredEventsError).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('createForm instance loginForm', () => {
    component.createForm();
    expect(component.loginForm).toBeTruthy();
  });

  it('onSubmit login correctly and navigate', () => {
    const routerService = fixture.debugElement.injector.get(Router);
    const spy = spyOn(routerService, 'navigate').and.callFake( () => null);
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit not login correctly', () => {
    const routerService = fixture.debugElement.injector.get(Router);
    const userService = fixture.debugElement.injector.get(UserService);
    const spy = spyOn(routerService, 'navigate').and.callFake( () => null);
    spyOn(userService, 'login').and.callFake( () => of({ email: '' }));
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('onSubmit not login because login return throwError', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'login').and.callFake( () => throwError({}));
    component.onSubmit();
    expect(component.msgs).toBe('Email not found.');
  });

});
