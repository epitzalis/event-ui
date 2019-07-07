import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../core/user.service';
import { ValidateFormService } from '../../core/validate-form.service';

@Component({
  selector: 'eui-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
/**
 * Class that represent the Signup component in the app
 */
export class SignupFormComponent implements OnInit {

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

  createForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  showPassword(showPassword: boolean) {
    this.password.nativeElement.type = showPassword ? 'text' : 'password';
  }

  /**
   * Fired when user click on "Signup" button in the form
   */
  onSubmit() {
    this.user = this.signupForm.value;

    this.userService.signup(this.user).subscribe((event: Event) => {
      this.router.navigate(['/events']);
    });
  }

}
