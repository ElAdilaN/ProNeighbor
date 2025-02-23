import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatInfoComponent } from './chat-info.component';
import { ChatServiceService } from '../../../services/chat-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatInfoComponent', () => {
  let component: ChatInfoComponent;
  let fixture: ComponentFixture<ChatInfoComponent>;
  let chatService: ChatServiceService;
  let mockActivatedRoute: any;

  const mockChatDetails = {
    chat_id: 'chat123',
    created_by: 'user1',
    created_at: '2025-02-23T12:00:00Z',
    service_name: 'Service A',
    service_category: 'Category X',
    service_price: 100,
    service_description: 'A detailed description of Service A',
    participants: [
      {
        user_name: 'User One',
        user_email: 'user1@example.com',
        user_phone: '123456789',
      },
      {
        user_name: 'User Two',
        user_email: 'user2@example.com',
        user_phone: '',
      },
    ],
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: (key: string) => 'chat123' } },
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ChatServiceService,
          useValue: { getChatInfo: () => of(mockChatDetails) },
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInfoComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(ChatServiceService);
  });

  it('should create component and load chat details on init', () => {
    spyOn(chatService, 'getChatInfo').and.returnValue(of(mockChatDetails));

    component.ngOnInit();
    fixture.detectChanges();

    // Check if service method is called
    expect(chatService.getChatInfo).toHaveBeenCalledWith('chat123');
    expect(component.chatDetails).toBeTruthy();
    expect(component.chatDetails.chat_id).toBe('chat123');
    expect(component.chatDetails.created_by).toBe('user1');
  });
});
