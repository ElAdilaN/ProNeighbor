import { ROLS } from './enum';
export class User {
  private _id: number = 0;
  private _name: string;
  private _email: string;
  private _hashed_password: string;
  private _phone: string;
  private _address: string;
  private _profile_pic: File | null;
  private _created_at: Date;
  private _roles: ROLS;
  constructor(
    _id: number,
    _name: string,
    _email: string,
    _hashed_password: string,
    _phone: string,
    _address: string,
    _profile_pic: File | null,
    _created_at: Date,
    _roles: ROLS
  ) {
    this._name = _name;
    this._email = _email;
    this._hashed_password = _hashed_password;
    this._phone = _phone;
    this._address = _address;
    this._profile_pic = _profile_pic;
    this._created_at = _created_at;
    this._roles = _roles;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get hashed_password(): string {
    return this._hashed_password;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): string {
    return this._address;
  }

  get profile_pic(): File | null {
    return this._profile_pic;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get roles(): ROLS {
    return this._roles;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set hashed_password(password: string) {
    this._hashed_password = password;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set address(address: string) {
    this._address = address;
  }

  set profile_pic(profilePic: File | null) {
    this._profile_pic = profilePic;
  }

  set created_at(createdAt: Date) {
    this._created_at = createdAt;
  }

  set roles(roles: ROLS) {
    this._roles = roles;
  }
}
