import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Modules
import { LoginModule } from './login/login.module';
import { EventsModule } from './events/events.module';
import { ProfileModule } from './profile/profile.module';
import { SignupModule } from './signup/signup.module';

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
    SharedModule,
    LoginModule,
    SignupModule,
    EventsModule,
    ProfileModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LayoutEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
