export class Review {
  // Private properties
  private _id: string;
  private _service_id: string;
  private _rating: number;
  private _comment: string;
  private _created_at: Date; // Updated to Date type
  private _user_id: string;

  // Constructor to initialize the properties
  constructor(
    id: string,
    service_id: string,
    rating: number,
    comment: string,
    created_at: Date, // Updated to Date type
    user_id: string
  ) {
    this._id = id;
    this._service_id = service_id;
    this._rating = rating;
    this._comment = comment;
    this._created_at = created_at;
    this._user_id = user_id;
  }

  // Getter for id
  get id(): string {
    return this._id;
  }

  // Setter for id
  set id(value: string) {
    this._id = value;
  }

  // Getter for service_id
  get service_id(): string {
    return this._service_id;
  }

  // Setter for service_id
  set service_id(value: string) {
    this._service_id = value;
  }

  // Getter for rating
  get rating(): number {
    return this._rating;
  }

  // Setter for rating
  set rating(value: number) {
    this._rating = value;
  }

  // Getter for comment
  get comment(): string {
    return this._comment;
  }

  // Setter for comment
  set comment(value: string) {
    this._comment = value;
  }

  // Getter for created_at
  get created_at(): Date {
    return this._created_at;
  }

  // Setter for created_at
  set created_at(value: Date) {
    this._created_at = value;
  }

  // Getter for user_id
  get user_id(): string {
    return this._user_id;
  }

  // Setter for user_id
  set user_id(value: string) {
    this._user_id = value;
  }
}
