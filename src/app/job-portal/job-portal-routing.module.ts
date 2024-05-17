import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPortalListComponent } from './job-portal-list/job-portal-list.component';
import { AddJobOpeningComponent } from './add-job-opening/add-job-opening.component';
import { ViewJobOpeningComponent } from './view-job-opening/view-job-opening.component';

const routes: Routes = [
  { path: '', component: JobPortalListComponent, pathMatch: 'full' },
  { path: 'add', component: AddJobOpeningComponent, pathMatch: 'full' },
  { path: 'edit', component: AddJobOpeningComponent, pathMatch: 'full' },
  { path: 'view', component: ViewJobOpeningComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPortalRoutingModule {}
