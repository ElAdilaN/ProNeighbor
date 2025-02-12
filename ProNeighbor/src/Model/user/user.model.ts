import { Service } from '../servicesProvider/service.model';
import { ROLS } from './enum';

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _phone?: string;
  private _address?: string;
  private _created_at: Date;
  private _roles: ROLS;
  constructor(
    _id: string,
    _name: string,
    _email: string,
    _roles: ROLS,
    _created_at: Date,
    _phone?: string,
    _address?: string
  ) {
    this._id = _id;
    this._name = _name;
    this._email = _email;
    this._phone = _phone;
    this._address = _address;
    this._created_at = _created_at;
    this._roles = _roles;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get name(): string {
    
    return this._name || '' ;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  get address(): string | undefined {
    return this._address;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get roles(): ROLS {
    return this._roles;
  }
  get formattedMemberSince(): string {
    return this.created_at.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Setters
  set id(id: string) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set address(address: string) {
    this._address = address;
  }

  set created_at(createdAt: Date) {
    this._created_at = createdAt;
  }

  set roles(roles: ROLS) {
    this._roles = roles;
  }
}

export class Provider extends User {
  private services: Service[] = [];

  constructor(
    id: string,
    name: string,
    email: string,
    role: ROLS,
    created_at: Date,
    phone?: string,
    address?: string
  ) {
    super(id, name, email, role, created_at, phone, address);
  }

  // Getter for services
  getServices(): Service[] {
    return this.services;
  }

  // Setter for services
  setServices(services: Service[]): void {
    this.services = services;
  }
}
