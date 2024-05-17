import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MatIconModule } from '@angular/material/icon';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { FormsModule } from '@angular/forms';
// import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ChatMainComponent,
    ChatListComponent,
    ChatWindowComponent,
    ChatMessagesComponent,
    // CreateGroupModalComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ],
})
export class ChatModule {}
