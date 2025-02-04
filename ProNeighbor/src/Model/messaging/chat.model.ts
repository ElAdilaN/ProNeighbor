export class Chat {
  constructor(
    private _id: number,
    private _created_by: number,
    private _service_id: number,
    private _created_at: Date,
    private _is_group: boolean
  ) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get created_by(): number {
    return this._created_by;
  }

  get service_id(): number {
    return this._service_id;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get is_group(): boolean {
    return this._is_group;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set created_by(createdBy: number) {
    this._created_by = createdBy;
  }

  set service_id(serviceId: number) {
    this._service_id = serviceId;
  }

  set created_at(createdAt: Date) {
    this._created_at = createdAt;
  }

  set is_group(isGroup: boolean) {
    this._is_group = isGroup;
  }
}

export class ChatDTO {
  constructor(
    public id: number,
    public created_by_name: string,
    public is_group: boolean
  ) {}
}
