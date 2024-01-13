type Author = 'user' | 'bot';

export default class Message {
  id: number;
  message?: string;
  image?: string;
  author: Author;
  date: Date;

  constructor(id: number, message: string, author: Author, date: Date) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.date = date;
  }

  static fromJson(json: any): Message {
    const msg = new Message(
      json.id,
      json.message,
      json.author,
      new Date(json.date)
    );
    if (json.image) {
      msg.image = json.image;
    }
    return msg;
  }
}
