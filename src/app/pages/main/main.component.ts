import { NgIf, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/messages.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-main',
  providers: [],
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  menuOpen = false
  sidebarOpen = false
  messages: any[] = [];
  newMessage: string = '';
  searchQuery = ''
  senderId: any = ''
  receiverId: string = ''

  constructor(private messageService: MessageService, private authService: AuthService, private cookieService: CookieService) { }
  ngOnInit() {
    const token = this.cookieService.get('jwt');
    const decoded = jwtDecode<JwtPayload>(token);
    this.senderId = decoded.sub
    this.messageService.connectToSocket();
    this.messageService.listenForMessages().subscribe(message => this.messages.push(message));
    this.messageService.listenForNotifications().subscribe((foriegnSender) => {/* next block of code */ });
    this.messageService.getMessages(this.senderId, this.receiverId).subscribe(messages => {
      console.log(messages)
      this.messages = messages;
    });
  }



  sendMessage() {

    this.messageService.sendMessageViaSocket(this.newMessage, this.senderId, this.receiverId);
    this.messages.push({
      content: this.newMessage,
      sender: { _id: this.senderId },
    });
    this.newMessage = '';
  }

  logOut() {
    this.authService.logout()
    this.messageService.disconnect();
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
