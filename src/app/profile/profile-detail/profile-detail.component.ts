import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as login from '../../store/login/login.actions';

@Component({
  selector: 'eui-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
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

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.userService.logout();
    this.store.dispatch(new login.Logged(false));
    this.router.navigate(['/home']);
  }

}
