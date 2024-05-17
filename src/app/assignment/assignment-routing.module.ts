import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../shared/authguard/auth.guard';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataSource } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: AddAssignmentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'view',
    component: ViewAssignmentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}
