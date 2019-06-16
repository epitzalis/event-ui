import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';

// Modules
import { LoginModule } from './login/login.module';
import { EventsModule } from './events/events.module';
import { ProfileModule } from './profile/profile.module';

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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    LoginModule,
    EventsModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
