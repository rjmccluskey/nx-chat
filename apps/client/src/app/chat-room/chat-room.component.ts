import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatMessageService } from './chat-message.service';
import { Message } from '@rjm/chat';
import { scan, tap } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'rjm-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements AfterViewChecked {
  messages$ = this.chatMessageService.message$.pipe(
    scan((messages: Message[], message) => [...messages, message], []),
    tap(() => this.shouldScroll = true)
  );
  messageContent = '';

  @ViewChild(CdkScrollable) scrollContainer: CdkScrollable;

  private shouldScroll = false;

  constructor(public chatMessageService: ChatMessageService) {
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  sendMessage(event: Event) {
    event.preventDefault();
    this.chatMessageService.addMessage(this.messageContent);
    this.messageContent = '';
  }

  scrollToBottom() {
    this.scrollContainer.scrollTo({ bottom: 0 })
  }
}
