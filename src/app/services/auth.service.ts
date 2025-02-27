// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  // Sign Up
  signUp(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  // Log In
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(
      tap(response => {
        const jwtToken = Object.values(response)[0];
        if (jwtToken) {
          this.cookieService.set('jwt', jwtToken);
        }
      })
    );
  }


  logout(): void {
    this.cookieService.delete('jwt');
    this.router.navigate(['/login']);
  }

}
