import { MESSAGESTATUS } from '../user/enum';

export class Message {
  constructor(
    private _id: number,
    private _chat_id: number,
    private _user_id: number,
    private _service_id: number | null,
    private _message: string,
    private _timestamp: Date,
    private _status: MESSAGESTATUS
  ) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get chat_id(): number {
    return this._chat_id;
  }

  get user_id(): number {
    return this._user_id;
  }

  get service_id(): number | null {
    return this._service_id;
  }

  get message(): string {
    return this._message;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get status(): MESSAGESTATUS {
    return this._status;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set chat_id(chatId: number) {
    this._chat_id = chatId;
  }

  set user_id(userId: number) {
    this._user_id = userId;
  }

  set service_id(serviceId: number | null) {
    this._service_id = serviceId;
  }

  set message(message: string) {
    this._message = message;
  }

  set timestamp(timestamp: Date) {
    this._timestamp = timestamp;
  }

  set status(status: MESSAGESTATUS) {
    this._status = status;
  }
}

export class MessageDTO {
  constructor(
    public id: number,
    public chat_id: number,
    public user_name: string,
    public message: string,
    public timestamp: Date,
    public status: MESSAGESTATUS
  ) {}
}
