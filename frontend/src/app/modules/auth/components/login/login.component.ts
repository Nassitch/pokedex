import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LoginType } from '../../models/login.type';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  postSubscription$: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  Form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]]
});

  onSubmit(): void {
    const form = this.Form.value;
    const user: LoginType= {
      email: form.email!,
      password: form.password!
    }
    this.postSubscription$ = this.authService.postLogin$(user).subscribe({
      next: () => {
        console.log("Content de te revoir !"),
        this.router.navigate(['/'])
      },
      error: () => console.log("Identifiant incorrect.")
    })
}
}
