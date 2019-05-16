import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Message, ChatEvent } from '@rjm/chat';
import { UserService } from '../user/user.service';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {
  message$: Observable<Message>;
  messages$: Observable<Message[]>;

  private socket = io.connect(environment.chatSocketUrl);

  constructor(private userService: UserService) {
    const message$ = new Subject<Message>();
    this.socket.on(ChatEvent.message, (message: Message) => message$.next(message));
    this.message$ = message$;
    this.messages$ = this.message$.pipe(
      scan((messages: Message[], message: Message) => [...messages, message], []),
    );
  }

  addMessage(content: string) {
    const message: Message = {
      username: this.userService.getUsername(),
      content,
      dateCreated: new Date()
    };
    this.socket.emit(ChatEvent.addMessage, message);
  }
}
