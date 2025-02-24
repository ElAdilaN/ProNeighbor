import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatListComponent } from './chat-list.component';
import { ChatServiceService } from '../../../services/chat-service.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'; // Import the testing module
import { Observable, of, throwError } from 'rxjs';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;
  let chatService: ChatServiceService;
  let authService: AuthService;
  let httpMock: HttpTestingController; // Declare HttpTestingController
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    // Create a mock ActivatedRoute
    const mockActivatedRoute = {
      snapshot: { paramMap: new Map() },
    };

    await TestBed.configureTestingModule({
      imports: [RouterModule, HttpClientTestingModule], // Add HttpClientTestingModule
      providers: [
        ChatServiceService,
        AuthService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(ChatServiceService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
    activatedRoute = TestBed.inject(ActivatedRoute); // Inject mock ActivatedRoute
  });

  beforeEach(() => {
    spyOn(authService, 'getUserIdFromToken').and.returnValue('user123'); // Mock method
  });

  afterEach(() => {
    fixture.destroy();
    httpMock.verify(); // Make sure no outstanding HTTP requests are left after each test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of chats when data is fetched successfully', () => {
    const mockChats = [
      { id: 'chat1', chatName: 'Chat 1' },
      { id: 'chat2', chatName: 'Chat 2' },
    ];

    spyOn(chatService, 'getAllChatsForUser').and.returnValue(of(mockChats));

    component.ngOnInit();
    fixture.detectChanges();

    const chatItems = fixture.nativeElement.querySelectorAll('.chat-item');

    expect(chatItems.length).toBe(2);
    expect(chatItems[0].textContent).toContain('Chat 1');
    expect(chatItems[1].textContent).toContain('Chat 2');
  });

  it('should display loading indicator while fetching chats', () => {
    spyOn(chatService, 'getAllChatsForUser').and.returnValue(new Observable());

    component.ngOnInit();
    fixture.detectChanges();

    const loadingIndicator =
      fixture.nativeElement.querySelector('.loading-spinner');
    expect(loadingIndicator).toBeTruthy();
  });

  it('should display an error message if fetching chats fails', () => {
    const errorResponse = 'Failed to load chats';

    spyOn(chatService, 'getAllChatsForUser').and.returnValue(
      throwError(() => new Error(errorResponse))
    );

    component.ngOnInit();
    fixture.detectChanges();

    const errorMessageElement =
      fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.textContent).toContain(errorResponse);
  });

  it('should call loadData on initialization', () => {
    spyOn(component, 'loadData');

    component.ngOnInit();

    expect(component.loadData).toHaveBeenCalled();
  });

  it('should navigate to the correct chat on button click', () => {
    const mockChats = [{ id: 'chat1', chatName: 'Chat 1' }];
    spyOn(chatService, 'getAllChatsForUser').and.returnValue(of(mockChats));

    component.ngOnInit();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.chat-btn');
    expect(button.getAttribute('ng-reflect-router-link')).toBe(
      '/dashboard/chat/chat1'
    ); // Corrected expected URL
  });
});
