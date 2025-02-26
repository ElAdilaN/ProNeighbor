import { Component, Input } from '@angular/core';
import { Service } from '../../../Model/servicesProvider/service.model';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChatServiceService } from '../../../services/chat-service.service';
import Swal from 'sweetalert2';

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
    private chatService: ChatServiceService,
  ) {}

  ngOnInit() {
    console.log('Review List for ID:', this.route.snapshot.paramMap.get('id'));
  }

  openChatDialog(serviceId: string, serviceName: string) {
    Swal.fire({
      title: `Enter a chat name for ${serviceName}:`,
      input: 'text',
      inputPlaceholder: 'Chat name',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Chat name is required!';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const chatName = result.value;

        this.chatService.CreateChatForService(serviceId, chatName).subscribe({
          next: (response) => {
            const chatId = response.chatId;
            this.router.navigate(['/dashboard/chat', chatId]);
          },
          error: (err) => {
            console.error('Failed to create chat:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Error creating chat. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
      }
    });
  }
}
