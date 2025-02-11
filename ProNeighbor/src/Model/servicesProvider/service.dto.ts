export class ServiceDTO {
  id: string;
  name: string;
  price: number;
  description: string;
  location: string;
  created_at: Date;
  category: string;

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    location: string,
    created_at: Date,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.location = location;
    this.created_at = created_at;
    this.category = category;
  }
}
