export class Service {
  private _id: string;
  private _name: string;
  private _price: number;
  private _description: string;
  private _location: string;
  private _created_at: Date;
  private _category: string;

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    location: string,
    created_at: Date,
    category: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._description = description;
    this._location = location;
    this._created_at = created_at;
    this._category = category;
  }

  // Getters
  get id(): string {
    return this._id;
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

  get category(): string {
    return this._category;
  }

  // Setters
  set id(id: string) {
    this._id = id;
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

  set category(category: string) {
    this._category = category;
  }
}

export class Category {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}

export class Categories implements Iterable<Category> {
  private categoriesList: Category[];
  constructor(categories: Category[]) {
    this.categoriesList = categories;
  }
  get Categories(): Category[] {
    return this.categoriesList;
  }
  set Categories(list: Category[]) {
    this.categoriesList = list;
  }
  [Symbol.iterator]() {
    return this.categoriesList[Symbol.iterator](); // This will allow iteration over Categories
  }
}
