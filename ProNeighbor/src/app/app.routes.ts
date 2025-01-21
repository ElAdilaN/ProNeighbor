import { Routes } from '@angular/router';
import { UserRegistrationComponent } from '../Components/Forms/user-registration/user-registration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
];
