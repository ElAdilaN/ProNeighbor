import { Component } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat-dashboard',
  standalone: true,
  imports: [ChatListComponent, RouterOutlet],
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.css',
})
export class ChatDashboardComponent {}
