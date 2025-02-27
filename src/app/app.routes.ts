import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignUpComponent },
    { path: "home", component: MainComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "login" }
];
