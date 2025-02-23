export class message {
  private _chat_id: string;
  private _user_id: string;
  private _message: string;
  private _timestamp: string;
  private _status: string | null;

  constructor(
    chat_id: string,
    user_id: string,
    message: string,
    timestamp: string,
    status: string | null
  ) {
    this._chat_id = chat_id;
    this._user_id = user_id;
    this._message = message;
    this._timestamp = timestamp;
    this._status = status;
  }

  // Getter and Setter for chat_id
  get chat_id(): string {
    return this._chat_id;
  }

  set chat_id(value: string) {
    this._chat_id = value;
  }

  // Getter and Setter for user_id
  get user_id(): string {
    return this._user_id;
  }

  set user_id(value: string) {
    this._user_id = value;
  }

  // Getter and Setter for message
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  // Getter and Setter for timestamp
  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }

  // Getter and Setter for status
  get status(): string | null {
    return this._status;
  }

  set status(value: string | null) {
    this._status = value;
  }
}
