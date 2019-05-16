import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatMessageService } from './chat-message.service';
import { Message } from '@rjm/chat';
import { tap, map, startWith } from 'rxjs/operators';
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
  messages$: Observable<Message[]> = this.chatMessageService.messages$.pipe(
    tap(() => this.shouldScroll = true)
  );
  users$: Observable<string[]> = this.chatMessageService.messages$.pipe(
    startWith([]),
    map(messages => this.getUniqueNames(messages))
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

  private getUniqueNames(messages: Message[]): string[] {
    return messages.reduce((names: string[], message) => {
      const currentName = message.username;
      if (currentName !== this.username && !names.includes(currentName)) {
        names.push(currentName)
      }
      return names;
    }, [])
  }
}
