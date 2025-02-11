export class Service {
  private id: string;
  private name: string;
  private price: number;
  private description: string;
  private location: string;
  private created_at: Date;
  private category: string;

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

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.description;
  }

  getLocation(): string {
    return this.location;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }

  getCategory(): string {
    return this.category;
  }

  // Setters
  setName(name: string): void {
    this.name = name;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setLocation(location: string): void {
    this.location = location;
  }

  setCategory(category: string): void {
    this.category = category;
  }
}
