import * as SocketIO from 'socket.io';
import { Server } from 'http';

export function initChatSocket(server: Server) {
  const chat = SocketIO(server).of('/chat').on('connection', socket => {
    
  });
}
