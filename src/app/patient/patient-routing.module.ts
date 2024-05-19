import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { ImprestListComponent } from './imprest-list/imprest-list.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';

const routes: Routes = [
  { path: '', component: PatientListComponent, pathMatch: 'full' },
  { path: 'add', component: AddPatientComponent, pathMatch: 'full' },
  { path: 'edit', component: AddPatientComponent, pathMatch: 'full' },
  { path: 'view', component: ViewPatientComponent, pathMatch: 'full' },
  { path: 'imprest', component: ImprestListComponent, pathMatch: 'full' },
  { path: 'fuel/add', component: AddFuelComponent, pathMatch: 'full' },
  { path: 'fuel/edit', component: AddFuelComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
