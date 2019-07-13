import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as login from './store/login/login.actions';
import { UserService } from './core/user.service';

@Component({
  selector: 'eui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Class that represent the main component in the app
 */
export class AppComponent {

  constructor(
    private readonly userService: UserService,
    private readonly store: Store<any>
  ) {
    /**
     * check user in store
     */
    this.userService.checkUser() ? this.store.dispatch(new login.Logged(true))
                  : this.store.dispatch(new login.Logged(false));
  }

}
