import * as SocketIO from 'socket.io';
import { Server } from 'http';
import { MessageRepository } from './message-repository';
import { ChatEvent, Message } from '@rjm/chat';

export function initChatSocket(server: Server) {
  const repository = new MessageRepository();
  const chat = SocketIO(server).of('/chat');

  chat.on('connection', socket => {
    console.log('SocketIO: User connected to chat stream')

    socket.on(ChatEvent.addMessage, async (message: Message) => {
      console.log(`SocketIO: New message from ${message.username}`);
      await repository.add(message);
      chat.emit(ChatEvent.message, message);
    });

    socket.on('disconnect', () => console.log('SocketIO: User disconnected from chat stream'));
  });

}
