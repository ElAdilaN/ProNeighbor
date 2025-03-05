import { Component } from '@angular/core';
import { message } from '../../../Model/messaging/message.model';
import { ChatServiceService } from '../../../services/chat/chat-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../../services/Socket/socket.service';
import { UsersService } from '../../../services/User/users.service';

import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  messages: message[] = [];
  chatId?: string | null;
  newMessage?: string;

  private routeSub!: Subscription;
  constructor(
    private chatService: ChatServiceService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    // subscribe to route changes
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.chatId = params['chatId'];
      this.getMessages(); // refresh messages when chatId changes
    });
    this.listenForNewMessages();
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getMessages(): void {
    if (this.chatId) {
      this.chatService.getAllMessagesForChat(this.chatId).subscribe({
        next: (data) => {
          this.messages = data;
          console.log(this.messages);
        },
        error: (error) => {
          console.error('Error fetching messages', error);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
    }
  }

  sendMessage() {
    const userId = this.authService.getUserIdFromToken();
    if (this.newMessage && this.chatId && userId) {
      console.log('Component sending message:', {
        chatId: this.chatId,
        message: this.newMessage,
        userId,
      });

      this.socketService.sendMessage(this.chatId, this.newMessage, userId);
      this.newMessage = '';
    }
  }

  listenForNewMessages() {
    this.socketService.onMessage().subscribe((message) => {
      if (message.chatId === this.chatId) {
        this.messages.unshift(message); // Add new message in real-time
      }
    });
  }
}
