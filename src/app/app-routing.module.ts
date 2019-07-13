import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth-guard.service';

/**
 * Components
 */
import { HomePageComponent } from './home-page/home-page.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * router with lazy loading
 */
const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'events',
    component: EventListComponent,
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),
  },
  {
    path: 'eventDetails/:id',
    component: EventDetailComponent,
  },
  {
    path: 'eventForm/:id',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
/**
 * Routing Module for the app
 */
export class AppRoutingModule { }
