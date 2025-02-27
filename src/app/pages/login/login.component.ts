import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authForm: FormGroup;
  isLogin = true;
  private router = inject(Router)

  constructor(private fb: FormBuilder, private authService: AuthService, private cookieService: CookieService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loginAuth(email: string, password: string) {
    return this.authService.login(this.authForm.value).subscribe({
      next: res => {
        console.log("successfully logged in", res)
        this.router.navigate(["/home"])
        this.cookieService.set('jwt', res.access_token)
      },
      error: err => console.log(err)
    })
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log('Logging in...', this.authForm.value);
      this.loginAuth(this.authForm.value.email, this.authForm.value.password)
    }
  }


}
