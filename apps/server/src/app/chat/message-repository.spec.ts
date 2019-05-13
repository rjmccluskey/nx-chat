import { MessageRepository, Message } from './message-repository';

describe('MessageRepository', () => {
  describe('getAll', () => {
    test('returns all messages in repo', async () => {
      const existingMessages: Message[] = [
        { username: 'name', content: 'Some message...', dateCreated: new Date('2019-01-01') },
        { username: 'name2', content: 'Some other message...', dateCreated: new Date('2019-01-02') },
        { username: 'name', content: 'blah blah', dateCreated: new Date('2019-01-03') },
      ];
      const repo = new MessageRepository(existingMessages);

      const messages = await repo.getAll();
      expect(messages).toEqual(existingMessages);
    });
  });

  describe('add', () => {
    test('adds message to repo with no messages', async () => {
      const repo = new MessageRepository();
      const message: Message = {
        username: 'name',
        content: 'Some message...',
        dateCreated: new Date()
      };

      await repo.add(message);
      const messages = await repo.getAll();

      expect(messages).toEqual([message]);
    });

    test('adds message to repo with existing messages', async () => {
      const existingMessages: Message[] = [
        { username: 'name', content: 'Some message...', dateCreated: new Date('2019-01-01') },
        { username: 'name2', content: 'Some other message...', dateCreated: new Date('2019-01-02') },
        { username: 'name', content: 'blah blah', dateCreated: new Date('2019-01-03') },
      ];
      const repo = new MessageRepository(existingMessages);
      const message: Message = {
        username: 'name',
        content: 'Newest message here',
        dateCreated: new Date()
      };

      await repo.add(message);
      const messages = await repo.getAll();

      expect(messages).toEqual([...existingMessages, message]);
    });
  });

  describe('get', () => {
    let existingMessages: Message[];
    let repo: MessageRepository;

    beforeEach(() => {
      existingMessages = [
        { username: 'name', content: 'Some message...', dateCreated: new Date('2019-01-01') },
        { username: 'name2', content: 'Some other message...', dateCreated: new Date('2019-01-02') },
        { username: 'name', content: 'blah blah', dateCreated: new Date('2019-01-03') },
      ];
      repo = new MessageRepository(existingMessages);
    });

    test('returns most recent message', async () => {
      const messages = await repo.get(0, 1);
      expect(messages).toEqual([existingMessages[2]]);
    })

    test('returns most recent messages', async () => {
      const messages = await repo.get(0, 2);
      expect(messages).toEqual([existingMessages[1], existingMessages[2]]);
    })

    test('returns single message with an offset', async () => {
      const messages = await repo.get(2, 1);
      expect(messages).toEqual([existingMessages[0]]);
    })

    test('returns multiple messages with an offset', async () => {
      const messages = await repo.get(1, 2);
      expect(messages).toEqual([existingMessages[0], existingMessages[1]]);
    })

    test('returns empty messages if offset is past final message', async () => {
      const messages = await repo.get(3, 5);
      expect(messages).toEqual([]);
    });

    test('returns messages if count is greater than remaining number of messages', async () => {
      const messages = await repo.get(1, 20);
      expect(messages).toEqual([existingMessages[0], existingMessages[1]]);
    });

    test('returns empty array if offset is invalid', async () => {
      const messages = await repo.get(-3, 3);
      expect(messages).toEqual([]);
    });

    test('returns empty array if count is invalid', async () => {
      const messages = await repo.get(1, -3);
      expect(messages).toEqual([]);
    });
  });
});
