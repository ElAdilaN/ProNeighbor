import { Routes } from '@angular/router';
import { UserRegistrationComponent } from '../Components/Forms/user-registration/user-registration.component';
import { LoginComponent } from '../Components/Forms/login/login.component';
import { HomeComponent } from '../Components/home/home.component';
import { authGuard } from '../guards/auth.guard';
authGuard;
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];
