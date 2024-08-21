import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { RegisterType } from '../../models/register.type';
import { Subscription } from 'rxjs';
import { LoginType } from '../../models/login.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {
  @ViewChild('inputField') inputField!: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  isPasswordVisible: boolean = false;
  typeInput: string = "password";
  see: string = "../../../../assets/icons/see.svg";
  hide: string = "../../../../assets/icons/hide.svg";

  postSubscription$: Subscription = new Subscription();

  Form = this.fb.group({
    name: ['',Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]]
});

togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
  this.typeInput = this.isPasswordVisible ? 'text' : 'password';
}

focusInput():void {
  this.inputField.nativeElement.focus();
}

  onSubmit() {
    const form = this.Form.value;
    const newUser: RegisterType = {
      name: form.name!,
      email: form.email!,
      password: form.password!
    }
    this.postSubscription$ = this.authService.postRegister$(newUser).subscribe({
      next: () => {
        console.log("Vous êtes bien inscrit."),
        this.router.navigate(['/'])
      },
      error: () => console.log("Une erreur s'est produite.")
    })
  console.log(this.Form.value);
}

ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
}

}
