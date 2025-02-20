export class Review {
  constructor(
    private _id: string = '',
    private _service_id: string = '',
    private _rating: number = 0,
    private _comment: string = '',
    private _created_at: Date = new Date(),
    private _user_id: string = ''
  ) {}

  // Getters
  get id(): string {
    return this._id;
  }
  get user_id(): string {
    return this._user_id;
  }

  get service_id(): string {
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
  set id(id: string) {
    this._id = id;
  }
  set user_id(user_id: string) {
    this._user_id = user_id;
  }

  set service_id(serviceId: string) {
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
    private _id: string,
    private _service_id: string,
    private _rating: number,
    private _comment: string,
    private _created_at: Date,
    private _user_id: string,
    private _user_name: string = 'Unknown' // Default value
  ) {}

  // Getters
  get id(): string {
    return this._id;
  }

  get service_id(): string {
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

  get user_id(): string {
    return this._user_id;
  }

  get user_name(): string {
    return this._user_name;
  }

  // Setters
  set user_name(name: string) {
    this._user_name = name.trim() || 'Unknown'; // Prevent empty values
  }
}
