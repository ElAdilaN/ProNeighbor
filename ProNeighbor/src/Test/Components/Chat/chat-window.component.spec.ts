import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatWindowComponent } from './chat-window.component';
import { ChatServiceService } from '../../../services/chat/chat-service.service';
import { SocketService } from '../../../services/Socket/socket.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importing HttpClientTestingModule

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  let chatService: ChatServiceService;
  let socketService: SocketService;
  let authService: AuthService;
  let activatedRouteMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      params: of({ chatId: 'chat1' }), // Simulating route parameter for chatId
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule, // Adding HttpClientTestingModule here
      ],
      providers: [
        ChatServiceService,
        SocketService,
        AuthService,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(ChatServiceService);
    socketService = TestBed.inject(SocketService);
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch messages on initialization', () => {
    const mockMessages = [
      { user_id: 'user1', message: 'Hello' },
      { user_id: 'user2', message: 'Hi there' },
    ];

    spyOn(chatService, 'getAllMessagesForChat').and.returnValue(
      of(mockMessages),
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(chatService.getAllMessagesForChat).toHaveBeenCalledWith('chat1');
    expect(component.messages.length).toBe(2);
    expect(component.messages[0].message).toBe('Hello');
  });
  it('should send a message when sendMessage is called', () => {
    spyOn(authService, 'getUserIdFromToken').and.returnValue('user1');
    spyOn(socketService, 'sendMessage');

    component.chatId = 'chat1';
    component.newMessage = 'New message';

    component.sendMessage();
    fixture.detectChanges();

    expect(socketService.sendMessage).toHaveBeenCalledWith(
      'chat1',
      'New message',
      'user1',
    );
    expect(component.newMessage).toBe('');
  });
  it('should handle errors when fetching messages fails', () => {
    spyOn(chatService, 'getAllMessagesForChat').and.returnValue(of([]));

    component.getMessages();
    fixture.detectChanges();

    expect(component.messages.length).toBe(0);
  });
});
