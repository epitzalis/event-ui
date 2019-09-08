import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { SubscriptionLike } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { USER } from '../core/constants';

@Component({
  selector: 'eui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
/**
 * Class that represent the toolbar component in top
 */
export class ToolbarComponent implements OnInit, OnDestroy {
  user: User;
  isAuthenticated: boolean;
  subscriptionLogin: SubscriptionLike;
  constructor(
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.subscriptionLogin = this.store.pipe(select('login')).subscribe(state => {
      if (state) {
        this.isAuthenticated = state.logged;
        if ( this.isAuthenticated) {
          this.user = JSON.parse(localStorage.getItem(USER));
        }
      }
    });
  }
  /**
   * After destroy the component loginSuscription need unsubscribe.
   */
  ngOnDestroy() {
    if (this.subscriptionLogin) {
      this.subscriptionLogin.unsubscribe();
    }
  }
}
