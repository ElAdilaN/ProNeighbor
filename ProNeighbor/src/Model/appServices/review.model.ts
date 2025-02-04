export class Review {
  constructor(
    private _id: number,
    private _service_id: number,
    private _rating: number,
    private _comment: string,
    private _created_at: Date
  ) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get service_id(): number {
    return this._service_id;
  }

  get rating(): number {
    return this._rating;
  }

  get comment(): string {
    return this._comment;
  }

  get created_at(): Date {
    return this._created_at;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set service_id(serviceId: number) {
    this._service_id = serviceId;
  }

  set rating(rating: number) {
    this._rating = rating;
  }

  set comment(comment: string) {
    this._comment = comment;
  }

  set created_at(createdAt: Date) {
    this._created_at = createdAt;
  }
}
export class ReviewDTO {
  constructor(
    public id: number,
    public service_name: string,
    public rating: number,
    public comment: string
  ) {}
}
