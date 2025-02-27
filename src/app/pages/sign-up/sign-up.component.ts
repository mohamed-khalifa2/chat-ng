import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private router = inject(Router)
  authForm: FormGroup;
  isLogin = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signupAuth(name: string, email: string, password: string) {
    return this.authService.signUp(this.authForm.value).subscribe({
      next: res => {
        console.log("successfully registered! " + res)
        this.authService.login(this.authForm.value).subscribe({
          next: login => {
            this.router.navigate(["/home"])
          },
          error: err => { console.log(err) }
        })
      },
      error: err => console.log(err)
    })
  }


  onSubmit() {
    console.log('signing up...', this.authForm.value);
    this.signupAuth(this.authForm.value.name, this.authForm.value.email, this.authForm.value.password)

  }

}
