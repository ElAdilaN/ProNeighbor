export class Chat {
  private _id: string;
  private _created_by: string;
  private _service_id: string | null;
  private _created_at: Date;
  private _is_group: boolean;
  private _chatName: string | null;

  constructor(
    id: string,
    created_by: string,
    service_id: string | null,
    created_at: string,
    is_group: boolean,
    chatName: string | null
  ) {
    this._id = id;
    this._created_by = created_by;
    this._service_id = service_id;
    this._created_at = new Date(created_at);
    this._is_group = is_group;
    this._chatName = chatName;
  }

  // Getters
  public get id(): string {
    return this._id;
  }

  public get created_by(): string {
    return this._created_by;
  }

  public get service_id(): string | null {
    return this._service_id;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public get is_group(): boolean {
    return this._is_group;
  }

  public get chatName(): string | null {
    return this._chatName;
  }

  // Setters
  public set id(id: string) {
    this._id = id;
  }

  public set created_by(created_by: string) {
    this._created_by = created_by;
  }

  public set service_id(service_id: string | null) {
    this._service_id = service_id;
  }

  public set created_at(created_at: string) {
    this._created_at = new Date(created_at);
  }

  public set is_group(is_group: boolean) {
    this._is_group = is_group;
  }

  public set chatName(chatName: string | null) {
    this._chatName = chatName;
  }

  // Static method to convert API response to Chat objects
  public static fromJson(json: any): Chat {
    return new Chat(
      json.id,
      json.created_by,
      json.service_id,
      json.created_at,
      json.is_group,
      json.chatName
    );
  }
}
