import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Replace with your backend WebSocket server URL
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });
  }

  // Listen for new messages
  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => {
        console.log('Received message from socket:', message);
        observer.next(message);
      });
    });
  }

  // Emit a new message event
  sendMessage(chatId: string, message: string, user_id: string) {
    console.log('Sending message:', { chatId, message, user_id });
    this.socket.emit('sendMessage', { chatId, message, user_id });
  }
}
