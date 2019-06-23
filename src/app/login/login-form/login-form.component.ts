import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'eui-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  msgs: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.email) {
        this.router.navigate(['/events']);
      } else {
        this.msgs = res;
      }
    }, err => this.msgs = 'Email not found.');
  }

}
