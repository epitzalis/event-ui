import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as login from '../../store/login/login.actions';
import { USER, HOME } from '../../core/constants';

@Component({
  selector: 'eui-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
/**
 * Class that represent the detail profile component in the app
 */
export class ProfileDetailComponent implements OnInit {
  user: User;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly store: Store<any>,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  /**
   * get user from local storage
   */
  getUser() {
    this.user = JSON.parse(localStorage.getItem(USER));
  }

  /**
   * Log out use from the system
   */
  logout() {
    this.userService.logout();
    this.store.dispatch(new login.Logged(false));
    this.router.navigate(['/' + HOME]);
  }

}
