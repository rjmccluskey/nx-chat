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

export interface Message {
  username: string;
  content: string;
  dateCreated: Date;
}
