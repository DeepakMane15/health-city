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
import { PermissionGuard } from './shared/authguard/permission.guard';
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
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Driver/Sewadar', type: 'canView' }
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./medical/medical.module').then((m) => m.MedicalModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Vehicle Management', type: 'canView' }
  },
  {
    path: 'fuels',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Fuel/Imprest A/C', type: 'canView' }
  },
  {
    path: 'inout',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Vehicle In/out', type: 'canView' }
  },

  {
    path: 'pre-request',
    loadChildren: () =>
      import('./driver/driver.module').then((m) => m.DriverModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Pre-request For vehicle', type: 'canView' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
