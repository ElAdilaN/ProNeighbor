import { TestBed } from '@angular/core/testing';
import { ChatServiceService } from './chat-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ChatServiceService', () => {
  let service: ChatServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ChatServiceService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    service = TestBed.inject(ChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
