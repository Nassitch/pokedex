import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../models/profile.type';
import { AuthService } from 'src/app/modules/auth/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  isPasswordVisible: boolean = false;
  typeInput: string = 'password';
  see: string = '../../../../assets/icons/see.svg';
  hide: string = '../../../../assets/icons/hide.svg';

  getSubscription$: Subscription = new Subscription();
  postSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

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
    this.getSubscription$ = this.profileService
      .getProfile$()
      .pipe(
        tap((profile: Profile) => {
          this.Form.patchValue({
            name: profile.name,
            email: profile.email,
          });
        })
      )
      .subscribe();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.typeInput = this.isPasswordVisible ? 'text' : 'password';
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  onSubmit(): void {
    const form = this.Form.value;
    const updateProfile: Profile = {
      name: form.name!,
      email: form.email!,
      password: form.password!,
    };
    this.postSubscription$ = this.profileService
      .updateProfile$(updateProfile)
      .subscribe({
        next: () => {
          this.toastService.success('Profile successfully updated.');
        },
        error: () => this.toastService.error('An error has occurred.'),
      });
  }

  logout(): void {
    this.authService.logout();
  }

  deleteAccount(): void {
    this.deleteSubscription$ = this.profileService.deleteProfile$().subscribe();
    this.router.navigate(['']);
    this.toastService.success('Your profile has been successfully deleted.');
  }
}
