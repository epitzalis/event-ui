import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../core/user.service';
import { ValidateFormService } from '../../core/validate-form.service';
import { EVENTS } from '../../core/constants';

@Component({
  selector: 'eui-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
/**
 * Class that represent the Signup component in the app
 */
export class SignupFormComponent implements OnInit {

  /**
   * ViewChild to be able to change input type in pasword
   */
  @ViewChild('password', {static: false}) password: ElementRef;
  signupForm: FormGroup;
  user: User;

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
   * inicialize form
   */
  createForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * change type of input when click in check show password
   */
  showPassword(showPassword: boolean) {
    this.password.nativeElement.type = showPassword ? 'text' : 'password';
  }

  /**
   * Fired when user click on "Signup" button in the form
   */
  onSubmit() {
    this.user = this.signupForm.value;
    this.userService.signup(this.user).subscribe(() => {
      this.router.navigate(['/' + EVENTS]);
    });
  }

}
