import { Routes } from '@angular/router';

import { HomeComponent } from '../Components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ROLS } from '../Model/user/enum';
import { UnauthorizedComponent } from '../Components/unauthorized/unauthorized.component';
import { UserAreaComponent } from '../Components/user-area/user-area.component';
import { ProviderAreaComponent } from '../Components/provider-area/provider-area.component';
import { UserProfileComponent } from '../Components/Forms/Profiles/user-profile/user-profile.component';
import { ServiceComponent } from '../Components/AppServices/serviceRegister/service.component';
import { ServiceListComponent } from '../Components/AppServices/service-list/service-list.component';
import { LoginComponent } from '../Components/Auth/login/login.component';
import { UserRegistrationComponent } from '../Components/Auth/user-registration/user-registration.component';

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
    data: { roles: [ROLS.USER, ROLS.PROVIDER] },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    canActivate: [authGuard],
    data: { roles: [ROLS.USER, ROLS.PROVIDER] },
  },
  {
    path: 'userArea',
    component: UserAreaComponent,
    canActivate: [authGuard],
    data: { roles: [ROLS.USER] },
  },
  {
    path: 'providerArea',
    component: ProviderAreaComponent,
    canActivate: [authGuard],
    data: { roles: [ROLS.PROVIDER] },
  },
  {
    path: 'UserProfile',
    component: UserProfileComponent,
  },
  {
    path: 'CreateService',
    component: ServiceComponent,
  },
  {
    path: 'ServiceList',
    component: ServiceListComponent,
  },
];
