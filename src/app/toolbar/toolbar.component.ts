import { Component, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { SubscriptionLike } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'eui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
/**
 * Class that represent the toolbar component in top
 */
export class ToolbarComponent implements OnDestroy {
  user: User;
  isAuthenticated: boolean;
  subscriptionLogin: SubscriptionLike;
  constructor(
    private readonly store: Store<any>
  ) {
    this.subscriptionLogin = store.pipe(select('login')).subscribe(state => {
      if (state) {
        this.isAuthenticated = state.logged;
        if ( this.isAuthenticated) {
          this.user = JSON.parse(localStorage.getItem('user'));
        }
      }
    });
  }

  /**
   * After destroy the component we need unsubscribe.
   */
  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
  }
}
