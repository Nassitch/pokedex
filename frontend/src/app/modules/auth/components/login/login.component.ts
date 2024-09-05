import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LoginType } from '../../models/login.type';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  postSubscription$: Subscription = new Subscription();

  isPasswordVisible = false;
  typeInput = 'password';
  see = '../../../../assets/icons/see.svg';
  hide = '../../../../assets/icons/hide.svg';

  Form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.typeInput = this.isPasswordVisible ? 'text' : 'password';
  }

  onSubmit(): void {
    const form = this.Form.value;
    const user: LoginType = {
      email: form.email ?? '',
      password: form.password ?? '',
    };
    this.postSubscription$ = this.authService.postLogin$(user).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.toastService.success('Welcome to you! You are now connected.');
      },
      error: () => this.toastService.error('Incorrect login details.'),
    });
  }
}
