import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'eui-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
