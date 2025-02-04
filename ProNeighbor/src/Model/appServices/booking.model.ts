export class Booking {
  constructor(
    private _id: number,
    private _service_id: number,
    private _receiver_id: number,
    private _booking_date: Date,
    private _status_id: number,
    private _created_at: Date,
    private _duration: number
  ) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get service_id(): number {
    return this._service_id;
  }

  get receiver_id(): number {
    return this._receiver_id;
  }

  get booking_date(): Date {
    return this._booking_date;
  }

  get status_id(): number {
    return this._status_id;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get duration(): number {
    return this._duration;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set service_id(serviceId: number) {
    this._service_id = serviceId;
  }

  set receiver_id(receiverId: number) {
    this._receiver_id = receiverId;
  }

  set booking_date(bookingDate: Date) {
    this._booking_date = bookingDate;
  }

  set status_id(statusId: number) {
    this._status_id = statusId;
  }

  set created_at(createdAt: Date) {
    this._created_at = createdAt;
  }

  set duration(duration: number) {
    this._duration = duration;
  }
}
export class BookingDTO {
  constructor(
    public id: number,
    public service_name: string,
    public booking_date: Date,
    public status: string,
    public duration: number
  ) {}
}
