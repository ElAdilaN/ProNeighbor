export class Status {
  constructor(private _id: number, private _status: string) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get status(): string {
    return this._status;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set status(status: string) {
    this._status = status;
  }
}
export class StatusDTO {
  constructor(public id: number, public status: string) {}
}
