import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { User } from '../models/user.model';

/**
 * store mock
 */
const storeMock = {
  pipe: () => of(null),
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * try that get user from store
   */
  it('store do get user', () => {
    component.subscriptionLogin = new Subscription();
    const store = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store, 'pipe').and.returnValue(of({
      logged: true,
    }));
    const mockUser: User = {
      id: '0',
      email: 'email@mock.com',
      password: '',
    };
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  /**
   * When store not return user
   */
  it('store do not get user', () => {
    component.subscriptionLogin = new Subscription();
    const store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'pipe').and.returnValue(of({
      logged: false,
    }));
    component.ngOnInit();
    expect(component.isAuthenticated).toBeFalsy();
  });

});
