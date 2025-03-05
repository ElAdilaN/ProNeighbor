import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chat } from '../../../Model/messaging/chat.model';
import { ChatServiceService } from '../../../services/chat/chat-service.service';
import { UsersService } from '../../../services/User/users.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
  UserId?: string | null;
  chats: Chat[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatServiceService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.UserId = this.authService.getUserIdFromToken();
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    if (this.UserId) {
      this.chatService.getAllChatsForUser().subscribe({
        next: (response: Chat[]) => {
          console.log(`Services for provider ${this.UserId}:`, response);
          this.chats = response;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load services';
          this.isLoading = false;
        },
      });
    }
  }
}
