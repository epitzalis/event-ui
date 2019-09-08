import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from './shared/shared.module';
import { UserService } from './core/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {

  const storeMock = {
    dispatch: () => true,
  };
  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        ToolbarComponent,
      ],
      providers: [
        UserService,
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    const userService1 = {
      checkUser: () => true,
    };
    const userService2 = {
      checkUser: () => false,
    };
    /**
     * When login is true
     */
    const appComponent1 = new AppComponent(userService1 as any, storeMock as any);
    expect(appComponent1).toBeTruthy();
    /**
     * When login is false
     */
    const appComponent2 = new AppComponent(userService2 as any, storeMock as any);
    expect(appComponent2).toBeTruthy();
  });

});
