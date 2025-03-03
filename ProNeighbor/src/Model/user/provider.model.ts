import { Service } from '../servicesProvider/service.model';
import { ROLS } from '../../enums/enum';
import { User } from './user.model';

export class Provider extends User {
  private services: Service[] = [];

  constructor(
    id: string,
    name: string,
    email: string,
    role: ROLS,
    created_at: Date,
    phone?: string,
    address?: string,
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
