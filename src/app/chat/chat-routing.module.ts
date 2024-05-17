import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/authguard/auth.guard';
import { ChatMainComponent } from './chat-main/chat-main.component';

const routes: Routes = [
  {
    path: '',
    component: ChatMainComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
