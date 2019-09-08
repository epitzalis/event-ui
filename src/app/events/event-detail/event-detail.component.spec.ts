import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { EventDetailComponent } from './event-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { ImagesService } from '../../core/images.service';
import { EventService } from '../../core/event.service';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;

 /**
  * mock data
  */
  const mockUserService = {
    checkUser: () => true,
  };

  const mockUser: User = {
    id: '0',
    email: 'email@mock.com',
    password: null,
  };

  const mockImg = {
    urls: {
      small: 'imgURL',
    },
  };

  const mockImagesService = {
    getImage: () => of(mockImg),
  };

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [
        EventDetailComponent,
      ],
      providers: [
        EventService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: ImagesService,
          useValue: mockImagesService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getImage obtain a img and execute getEvent', () => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const spy = spyOn(eventService, 'getEvent').and.callFake( () =>  of(null));
    component.getImage();
    expect(component.imageUrl).toBe('imgURL');
    expect(spy).toHaveBeenCalled();
  });

  it('deleteEvent execute eventServive.deleteEventnavigate() and navigate', () => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const routerService = fixture.debugElement.injector.get(Router);
    const spy1 = spyOn(eventService, 'deleteEvent').and.callFake( () => of(null));
    const spy2 = spyOn(routerService, 'navigate').and.callFake( () => null);
    component.deleteEvent({ id: 0 } as any);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('deleteEvent not navigate', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const routerService = fixture.debugElement.injector.get(Router);
    spyOn(userService, 'checkUser').and.callFake( () => false);
    const spy = spyOn(routerService, 'navigate').and.callFake( () => null);
    component.deleteEvent({ id: 0 } as any);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * isOwner return true if user stored in localStorage is the owner of the event
   */
  it('isOwner return false because not get user', () => {
    spyOn(localStorage, 'getItem').and.callFake( () => null);
    expect(component.isOwner( { addedBy: '' } as any)).toBeFalsy();
  });

  it('isOwner return false because user not equal to event addedBy', () => {
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    expect(component.isOwner( { addedBy: '' } as any)).toBeFalsy();
  });

  it('isOwner return true', () => {
    spyOn(localStorage, 'getItem').and.callFake( () => JSON.stringify(mockUser));
    expect(component.isOwner( { addedBy: 'email@mock.com' } as any)).toBeTruthy();
  });

});
