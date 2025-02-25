import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "sign-up", component: SignUpComponent },
    { path: "home", component: MainComponent }
];
