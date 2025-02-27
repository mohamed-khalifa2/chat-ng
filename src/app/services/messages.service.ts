import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private socket!: Socket;
  private uri = 'http://localhost:3000'

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  connectToSocket() {
    const token = this.cookieService.get('jwt');
    if (!token) {
      console.error('No JWT token found.');
      return;
    }
    this.socket = io(this.uri, {
      auth: { jwt: token },
    });
    this.socket.on('connect', () => console.log('Connected to WebSocket'));
    this.socket.on('disconnect', () => console.log('Disconnected from WebSocket'));
  }

  // Fetch old messages from API
  getMessages(sender: string, receiver: string): Observable<any> {
    this.socket.emit('fetchMessages', { sender, receiver });
    return new Observable(observer => {
      this.socket.on('oldMessages', (messages) => observer.next(messages));
      return () => this.socket.off('oldMessages');
    });
  }

  // Send a new message via WebSocket
  sendMessageViaSocket(content: string, sender: string, receiver: string) {
    this.socket.emit('sendMessage', { content, sender, receiver });
  }

  // Listen for new incoming messages
  listenForMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => observer.next(message));
      return () => this.socket.off('newMessage');
    });
  }


  listenForNotifications(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('notifyUser', (sender) => observer.next(sender));

    });
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
