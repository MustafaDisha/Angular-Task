import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.auth.getUserRole();

    if (!this.auth.isAuthenticated() || userRole !== expectedRole) {
      this.router.navigate(['/page-not-found'], { replaceUrl: true });
      return false;
    }

    return true;
  }
}
