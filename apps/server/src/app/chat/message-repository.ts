export interface Message {
  username: string;
  content: string;
  dateCreated: Date;
}

export class MessageRepository {
  private messages: Message[];

  constructor(messages: Message[] = []) {
    // Assume messages are already sorted by date created
    this.messages = this.cloneMessages(messages);
  }

  async add(message: Message) {
    this.messages.push(message);
  }

  async getAll(): Promise<Message[]> {
    return this.cloneMessages(this.messages);
  }

  /**
   * @param offset Offset of 0 means the most recent message
   */
  async get(offset: number, count: number): Promise<Message[]> {
    if (offset < 0 || count < 0) {
      return [];
    }

    const endIndex = this.messages.length - offset;
    const startIndex = endIndex - count;
    const messages = this.messages.slice(startIndex, endIndex);
    return this.cloneMessages(messages);
  }

  private cloneMessages(messages: Message[]): Message[] {
    return messages.map(message => ({ ...message }));
  }
}
