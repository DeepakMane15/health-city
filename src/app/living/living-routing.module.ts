import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivingListComponent } from './living-list/living-list.component';
import { AddLivingComponent } from './add-living/add-living.component';
import { LivingBoardComponent } from './living-board/living-board.component';
import { ViewLivingComponent } from './view-living/view-living.component';

const routes: Routes = [
  { path: '', component: LivingListComponent, pathMatch: 'full' },
  { path: 'board', component: LivingBoardComponent, pathMatch: 'full' },
  { path: 'add', component: AddLivingComponent, pathMatch: 'full' },
  { path: 'edit', component: AddLivingComponent, pathMatch: 'full' },
  { path: 'board/view', component: ViewLivingComponent, pathMatch: 'full' },
  { path: 'view', component: ViewLivingComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivingRoutingModule {}
