import { Component, Input } from '@angular/core';

interface Message {
  role: string;
  content: string;
}

@Component({
  selector: 'app-chat-message',
  template: `
    <div class="message" [ngClass]="{'user-message': message.role === 'user', 'bot-message': message.role === 'assistant'}">
      <p>{{ message.content }}</p>
    </div>
  `,
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() message!: Message;
}
