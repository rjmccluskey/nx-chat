import * as SocketIO from 'socket.io';
import { Server } from 'http';
import { Message, MessageRepository } from './message-repository';

export enum ChatEvent {
  /**
   * Emitted from client to add new message
   */
  addMessage = 'add message',
  /**
   * Emitted from server when a message has been added
   */
  message = 'message'
}

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
