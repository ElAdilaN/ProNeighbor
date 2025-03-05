import { Component } from '@angular/core';
import { UsersService } from '../../../services/User/users.service';
import { User } from '../../../Model/user/user.model';
import { ChatServiceService } from '../../../services/chat/chat-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-participant',
  standalone: true,
  imports: [],
  templateUrl: './add-participant.component.html',
  styleUrl: './add-participant.component.css',
})
export class AddParticipantComponent {
  users: User[] = [];
  chatId: string | null = null;
  selectedUserIds: string[] = [];
  constructor(
    private userService: UsersService,
    private chatService: ChatServiceService,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.chatId = this.activatedRoute.snapshot.paramMap.get('chatId');

    this.loadAllUsers();
  }
  loadAllUsers() {
    if (this.chatId) {
      this.userService.getAllUsers(this.chatId).subscribe((data) => {
        this.users = data;
      });
    }
  }
  toggleUserSelection(userId: string) {
    const index = this.selectedUserIds.indexOf(userId);
    if (index > -1) {
      this.selectedUserIds.splice(index, 1);
    } else {
      if (this.selectedUserIds.length < 3) {
        this.selectedUserIds.push(userId);
      } else {
        alert('You can select a maximum of 3 users.');
      }
    }
  }

  AddParticipant() {
    for (let user of this.selectedUserIds) {
      if (this.chatId) {
        this.chatService.addParticipant(this.chatId, user).subscribe({
          next: () => {},
          error: (error) => {
            console.error('Error fetching messages', error);
          },
        });
      }
    }
  }
}
