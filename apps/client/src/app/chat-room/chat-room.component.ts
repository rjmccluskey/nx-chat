import { Component, OnInit } from '@angular/core';
import { ChatMessageService } from './chat-message.service';
import { Message } from '@rjm/chat';

@Component({
  selector: 'rjm-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  messages: Message[] = [];

  constructor(private chatMessageService: ChatMessageService) {
  }

  ngOnInit() {
    this.chatMessageService.message$.subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage(content: string) {
    this.chatMessageService.addMessage(content);
  }

}
