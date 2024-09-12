import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { RegisterType } from '../../models/register.type';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private title: Title,
    private meta: Meta
  ) {}

  isPasswordVisible = false;
  typeInput = 'password';
  see = '../../../../assets/icons/see.svg';
  hide = '../../../../assets/icons/hide.svg';

  postSubscription$: Subscription = new Subscription();

  Form = this.fb.group({
    name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.title.setTitle('Sign up - Pokedex');
    this.meta.updateTag({ name: 'description', content: 'Sign up and access profile or favorites.' });
    this.meta.updateTag({ name: 'keywords', content: 'sign, signup, sign up, register' });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.typeInput = this.isPasswordVisible ? 'text' : 'password';
  }

  onSubmit() {
    const form = this.Form.value;
    const newUser: RegisterType = {
      name: form.name ?? '',
      email: form.email ?? '',
      password: form.password ?? '',
    };
    this.postSubscription$ = this.authService.postRegister$(newUser).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.toastService.success(
          'Registration completed successfully, Welcome !'
        );
      },
      error: () => this.toastService.error('An error has occurred.'),
    });
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
  }
}
