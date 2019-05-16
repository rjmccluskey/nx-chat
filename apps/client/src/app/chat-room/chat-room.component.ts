import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatMessageService } from './chat-message.service';
import { Message } from '@rjm/chat';
import { scan, tap } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rjm-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  messages$: Observable<Message[]> = this.chatMessageService.message$.pipe(
    scan((messages: Message[], message: Message) => {
      messages.push(message);
      return messages;
    }, []),
    tap(() => this.shouldScroll = true)
  );
  messageContent = '';
  username: string;

  @ViewChild(CdkScrollable) scrollContainer: CdkScrollable;

  private shouldScroll = false;

  constructor(private chatMessageService: ChatMessageService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    const username = this.userService.getUsername();
    if (username) {
      this.username = username;
    } else {
      this.router.navigate(['/new-user']);
    }
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
