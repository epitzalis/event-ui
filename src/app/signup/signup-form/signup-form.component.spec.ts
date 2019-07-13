import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { ValidateFormService } from '../../core/validate-form.service';
import { UserService } from '../../core/user.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  const mockUserService = {
    signup: () => of({ email: 'email@mock.com' }),
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
        SignupFormComponent
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
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createForm instance loginForm', () => {
    component.createForm();
    expect(component.signupForm).toBeTruthy();
  });

  it('onSubmit signup correctly and navigate', () => {
    const routerService = fixture.debugElement.injector.get(Router);
    const spy = spyOn(routerService, 'navigate').and.callFake( () => null);
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  /**
   * try that change type of input
   */
  it('showPassword change type of input', () => {
    component.showPassword(true);
    expect(component.password.nativeElement.type).toBe('text');
    component.showPassword(false);
    expect(component.password.nativeElement.type).toBe('password');
  });

});
