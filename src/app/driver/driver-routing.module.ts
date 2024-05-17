import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ViewDriverComponent } from './view-driver/view-driver.component';

const routes: Routes = [
  { path: '', component: DriverListComponent, pathMatch: 'full' },
  { path: 'add', component: AddDriverComponent, pathMatch: 'full' },
  { path: 'edit', component: AddDriverComponent, pathMatch: 'full' },
  {
    path: 'view',
    component: ViewDriverComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {}
