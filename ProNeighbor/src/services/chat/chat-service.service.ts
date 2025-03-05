import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersService } from '../User/users.service';
@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  constructor(
    private http: HttpClient,
    private userService: UsersService,
  ) {}

  CreateChatForService(service_id: string, ChatName: string): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url_CreateChat}`,
      { service_id, ChatName },
      {
        headers: this.userService.getHeaders(),
      },
    );
  }
  CreateChatWithProvider(ChatName: string): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url_CreateChat}`,
      { ChatName },
      {
        headers: this.userService.getHeaders(),
      },
    );
  }
  getAllChatsForUser(): Observable<any> {
    return this.http.get<any>(`${environment.api_url_GetChatsForUser}`, {
      headers: this.userService.getHeaders(),
    });
  }
  getAllMessagesForChat(chatId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.api_url_GetMessagesForChat}${chatId}/messages`,
      {
        headers: this.userService.getHeaders(),
      },
    );
  }

  SendMessage(chatId: string, message: string): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url_SendMessage}`,
      { chatId, message },
      {
        headers: this.userService.getHeaders(),
      },
    );
  }

  addParticipant(chatId: string, userId: string) {
    return this.http.post<any>(
      `${environment.api_url_AddParticipant}`,
      { chatId, userId },
      {
        headers: this.userService.getHeaders(),
      },
    );
  }

  getChatInfo(chatId: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url_GetChatInfo}${chatId}`, {
      headers: this.userService.getHeaders(),
    });
  }
}
