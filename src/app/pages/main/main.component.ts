import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  providers: [],
  imports: [NgClass, FormsModule, NgFor, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  menuOpen = false;

  chats = [
    { name: 'bla', lastMessage: 'bla message' },
    { name: 'bla', lastMessage: 'bla message' },
    { name: 'bla', lastMessage: 'bla message' },
  ];

  messages = [
    { text: 'bla bla', isUser: false },
    { text: 'bla bla', isUser: true },
    { text: 'bla bla', isUser: true },
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, isUser: true });
      this.newMessage = '';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
