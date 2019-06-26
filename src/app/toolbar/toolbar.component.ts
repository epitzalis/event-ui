import { Component, DoCheck, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../core/user.service';
import { SubscriptionLike } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'eui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {
  user: User;
  isAuthenticated: boolean;
  subscriptionLogin: SubscriptionLike;
  constructor(
    private readonly userService: UserService,
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

  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
  }
}
