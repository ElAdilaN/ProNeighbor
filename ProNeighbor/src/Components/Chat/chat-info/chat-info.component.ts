import { Component } from '@angular/core';
import { ChatServiceService } from '../../../services/chat-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-info',
  standalone: true,
  imports: [],
  templateUrl: './chat-info.component.html',
  styleUrl: './chat-info.component.css',
})
export class ChatInfoComponent {
  chatDetails: any;
  chatId?: string | null;
  constructor(
    private chatService: ChatServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('chatId');
    if (this.chatId) {
      this.getChatDetails(this.chatId);
    }
  }
  getChatDetails(chatId: string): void {
    this.chatService.getChatInfo(chatId).subscribe((details) => {
      this.chatDetails = details;
    });
  }
}
