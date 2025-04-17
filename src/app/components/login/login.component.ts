import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { userRoleEnum } from '../../types/roles';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: LoginService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const user = this.userService.users.find(u => u.email === email && u.password === password);

    if (!user) {
      this.loginError = 'Wrong username or password. Please try again.';
      this.showError = true;
      return;
    }

    this.authService.login(user);

    switch (user.role) {
      case userRoleEnum.admin:
        this.router.navigate(['/admin'], { replaceUrl: true });
        break;
      case userRoleEnum.user:
        this.router.navigate(['/user'], { replaceUrl: true });
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
