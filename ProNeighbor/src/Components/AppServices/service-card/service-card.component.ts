import { Component, Input } from '@angular/core';
import { Service } from '../../../Model/servicesProvider/service.model';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChatServiceService } from '../../../services/chat-service.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  @Input() service!: Service;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatServiceService
  ) {}

  ngOnInit() {
    console.log('Review List for ID:', this.route.snapshot.paramMap.get('id'));
  }
  openChatDialog(serviceId: string, serviceName: string) {
    const chatName = prompt(`Enter a chat name for ${serviceName}:`);

    if (chatName?.trim()) {
      // Create the chat with the provided name
      this.chatService.CreateChatForService(serviceId, chatName).subscribe({
        next: (response) => {
          const chatId = response.chatId;

          this.router.navigate(['/dashboard/chat', chatId]);
        },
        error: (err) => {
          console.error('Failed to create chat:', err);
          alert('Error creating chat. Please try again.');
        },
      });
    } else {
      alert('Chat name is required!');
    }
  }
}
