import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceListComponent } from '../ambulance/ambulance-list/ambulance-list.component';
import { AuthGuard } from '../shared/authguard/auth.guard';
import { AddAmbulanceComponent } from './add-ambulance/add-ambulance.component';
import { ViewAmbulanceComponent } from './view-ambulance/view-ambulance.component';

const routes: Routes = [
  {
    path: '',
    component: AmbulanceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddAmbulanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: AddAmbulanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view',
    component: ViewAmbulanceComponent,
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanceRoutingModule {}
