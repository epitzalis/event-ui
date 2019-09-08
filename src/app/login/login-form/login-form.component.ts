import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { ValidateFormService } from '../../core/validate-form.service';
import { EVENTS } from '../../core/constants';

@Component({
  selector: 'eui-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
/**
 * Class that represent the login form component in the app
 */
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  msgs: string;

  constructor(
    public readonly validateFormService: ValidateFormService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }
/**
 * instanze form
 */
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Fired when user click on "Login" button in the form
   */
  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.email) {
        this.router.navigate(['/' + EVENTS]);
      } else {
        this.msgs = res;
      }
    }, err => this.msgs = 'Email not found.');
  }

}
