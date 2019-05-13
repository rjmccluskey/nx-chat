import * as express from 'express';
import { Server } from 'http';
import { initChatSocket } from './app/chat/chat-socket';

const app = express();
const server = new Server(app);

const port = process.env.port || 3333;
server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${port}`);
});

initChatSocket(server);
