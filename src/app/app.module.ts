import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

// Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { EventsModule } from './events/events.module';

// State Management
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './store/layout/layout.effects';

// Components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandlerService } from './core/global-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorsInterceptor } from './core/server-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ToolbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    EventsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LayoutEffects])
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
/**
 * General Module for the app
 */
export class AppModule {}
