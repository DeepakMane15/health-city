import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/authguard/auth.guard';
import { LoginGuard } from './shared/loginguard/login.guard';
import { TeamBoardComponent } from './team-board/team-board.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { TeamInvitationComponent } from './team-invitation/team-invitation.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
//import { DocumentComponent } from './document/document.component';
const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: Dashboard2Component,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-team',
    loadChildren: () =>
      import('./medical/medical.module').then((m) => m.MedicalModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    loadChildren: () => import('./new-chat/new-chat.module').then((m) => m.NewChatModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'new-chat',
  //   loadChildren: () => import('./new-chat/new-chat.module').then((m) => m.NewChatModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'team-board',
    component: TeamBoardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'team-board/medical-team',
    component: ViewMedicalComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance.module').then((m) => m.AmbulanceModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then((m) => m.DriverModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'job-portal',
    loadChildren: () =>
      import('./job-portal/job-portal.module').then((m) => m.JobPortalModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'living',
    loadChildren: () =>
      import('./living/living.module').then((m) => m.LivingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'team-invitation',
    component: TeamInvitationComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'dashboard2',
  //   component: Dashboard2Component,
  //   canActivate: [AuthGuard],
  // },
  //   {
  //     path: 'document',
  //     component : DocumentComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
