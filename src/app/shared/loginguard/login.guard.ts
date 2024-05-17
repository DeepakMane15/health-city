import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true; // Allow access to login page if not logged in
    } else {
      this.router.navigate(['/']); // Redirect to home if already logged in
      return false;
    }
  }
}
