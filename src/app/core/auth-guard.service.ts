import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  /**
   * Check if user is logged.
   */
  canActivate(): boolean {
    if (this.userService.checkUser()) {
      return true;
    } else {
      /**
       * when user not login, redirect to login
       */
      this.router.navigate(['/login']);
      return false;
    }
  }
}
