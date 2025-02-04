export class ChatParticipant {
  constructor(
    private _id: number,
    private _chat_id: number,
    private _user_id: number
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
}
export class ChatParticipantDTO {
  constructor(public id: number, public user_name: string) {}
}
