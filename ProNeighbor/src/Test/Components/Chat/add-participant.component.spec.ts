import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { UsersService } from '../../../services/User/users.service';
import { ChatServiceService } from '../../../services/chat/chat-service.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../../Model/user/user.model';
import { ROLS } from '../../../enums/enum';
import { AddParticipantComponent } from '../../../Components/Chat/add-participant/add-participant.component';

describe('AddParticipantComponent', () => {
  let component: AddParticipantComponent;
  let fixture: ComponentFixture<AddParticipantComponent>;
  let usersService: UsersService;
  let chatService: ChatServiceService;
  let mockActivatedRoute: any;

  const mockUsers = () => [
    new User(
      '1',
      'User One',
      'user1@example.com',
      ROLS.USER,
      new Date(),
      '1234567890',
      '123 Main St',
    ),
    new User(
      '2',
      'User Two',
      'user2@example.com',
      ROLS.PROVIDER,
      new Date(),
      '0987654321',
      '456 Elm St',
    ),
    new User('3', 'User Three', 'user3@example.com', ROLS.PROVIDER, new Date()),
  ];

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: (key: string) => 'chat123' } },
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        ChatServiceService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddParticipantComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    chatService = TestBed.inject(ChatServiceService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    spyOn(usersService, 'getAllUsers').and.returnValue(of(mockUsers()));

    component.ngOnInit();
    fixture.detectChanges();

    expect(usersService.getAllUsers).toHaveBeenCalledWith('chat123');
    expect(component.users.length).toBe(3);
    expect(component.users[0]).toBeInstanceOf(User);
  });
  it('should toggle user selection', () => {
    component.users = mockUsers();

    component.toggleUserSelection('1');
    expect(component.selectedUserIds).toContain('1');

    component.toggleUserSelection('1');
    expect(component.selectedUserIds).not.toContain('1');
  });
  it('should not allow more than 3 users to be selected', () => {
    component.users = mockUsers();
    component.selectedUserIds = ['1', '2', '3'];
    spyOn(window, 'alert');

    component.toggleUserSelection('4');
    expect(window.alert).toHaveBeenCalledWith(
      'You can select a maximum of 3 users.',
    );
    expect(component.selectedUserIds.length).toBe(3);
  });
});
