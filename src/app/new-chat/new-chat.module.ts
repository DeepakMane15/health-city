import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../shared/pipe/search.pipe';

const routes: Routes = [
  { path: '', component: ChatMainComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ChatMainComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormField,
    ReactiveFormsModule,
    FormsModule,
    SearchPipe
  ],
})
export class NewChatModule {}
