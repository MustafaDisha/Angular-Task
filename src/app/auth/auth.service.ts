import { Injectable } from '@angular/core';
import { User } from '../components/login/login.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  constructor() {
    const user = this.getUserFromToken();
    if (user) {
      this.setUser(user);
    }
  }
  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  login(user: User): void {
    const fakeToken = `header.${btoa(JSON.stringify(user))}.signature`;
    localStorage.setItem(this.tokenKey, fakeToken);
    this.setUser(user);
  }
  getUserRole(): string | null {
    const user = this.getUserFromToken();
    return user?.role || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserFromToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
