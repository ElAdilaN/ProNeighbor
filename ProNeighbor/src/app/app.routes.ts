import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ROLS } from '../Model/user/enum';
import { UnauthorizedComponent } from '../Components/unauthorized/unauthorized.component';
import { UserAreaComponent } from '../Components/user-area/user-area.component';
import { ProviderAreaComponent } from '../Components/provider-area/provider-area.component';
import { UserProfileComponent } from '../Components/user-profile/user-profile.component';
import { ServiceComponent } from '../Components/AppServices/serviceRegister/service.component';
import { ServiceListComponent } from '../Components/AppServices/service-list/service-list.component';
import { LoginComponent } from '../Components/Auth/login/login.component';
import { UserRegistrationComponent } from '../Components/Auth/user-registration/user-registration.component';
import { ServiceDetailsComponent } from '../Components/AppServices/service-details/service-details.component';
import { ReviewListComponent } from '../Components/Reviews/review-list/review-list.component';
import { ReviewFormComponent } from '../Components/Reviews/review-form/review-form.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { ChatDashboardComponent } from '../Components/Chat/chat-dashboard/chat-dashboard.component';
import { ChatListComponent } from '../Components/Chat/chat-list/chat-list.component';
import { ChatWindowComponent } from '../Components/Chat/chat-window/chat-window.component';
import { ChatInfoComponent } from '../Components/Chat/chat-info/chat-info.component';
import { AddParticipantComponent } from '../Components/Chat/add-participant/add-participant.component';
import { SaqComponent } from '../Components/saq/saq.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: [ROLS.USER, ROLS.PROVIDER] },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'UserProfile', component: UserProfileComponent },
      { path: 'ServiceList/:id', component: ServiceListComponent },
      { path: 'faq', component: SaqComponent },
      { path: 'ServiceDetail/:id', component: ServiceDetailsComponent },
      {
        path: 'ReviewsList/:id',
        component: ReviewListComponent,
      },
      {
        path: 'chat',
        component: ChatDashboardComponent,
        canActivate: [authGuard],
        data: { roles: [ROLS.USER, ROLS.PROVIDER] },
        children: [
          { path: ':chatId', component: ChatWindowComponent },
          { path: ':chatId/info', component: ChatInfoComponent },
          {
            path: ':chatId/add-participant',
            component: AddParticipantComponent,
          },
        ],
      },
      // User-specific routes
      {
        path: 'userArea',
        component: UserAreaComponent,
        canActivate: [authGuard],
        data: { roles: [ROLS.USER] },
      },
      {
        path: 'ReviewForm',
        component: ReviewFormComponent,
        canActivate: [authGuard],
        data: { roles: [ROLS.USER] },
      },

      // Provider-specific routes
      {
        path: 'providerArea',
        component: ProviderAreaComponent,
        canActivate: [authGuard],
        data: { roles: [ROLS.PROVIDER] },
      },
      {
        path: 'CreateService',
        component: ServiceComponent,
        canActivate: [authGuard],
        data: { roles: [ROLS.PROVIDER] },
      }, //service Id

      {
        path: 'ReviewForm',
        component: ReviewFormComponent,
        canActivate: [authGuard],
        data: { roles: [ROLS.USER] },
      },
    ],
  },

  { path: 'unauthorized', component: UnauthorizedComponent },
  // { path: '**', redirectTo: 'login' },
];
