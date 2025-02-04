export class Service {
  constructor(
    private _id: number,
    private _provider_id: number,
    private _category_id: number,
    private _name: string,
    private _price: number,
    private _description: string,
    private _location: string,
    private _created_at: Date
  ) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get provider_id(): number {
    return this._provider_id;
  }

  get category_id(): number {
    return this._category_id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get description(): string {
    return this._description;
  }

  get location(): string {
    return this._location;
  }

  get created_at(): Date {
    return this._created_at;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set provider_id(providerId: number) {
    this._provider_id = providerId;
  }

  set category_id(categoryId: number) {
    this._category_id = categoryId;
  }

  set name(name: string) {
    this._name = name;
  }

  set price(price: number) {
    this._price = price;
  }

  set description(description: string) {
    this._description = description;
  }

  set location(location: string) {
    this._location = location;
  }

  set created_at(createdAt: Date) {
    this._created_at = createdAt;
  }
}

export class ServiceDTO {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public location: string,
    public category_name: string
  ) {}
}
