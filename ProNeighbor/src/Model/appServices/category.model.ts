export class Category {
  constructor(private _id: number, private _name: string) {}

  // Getters
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }
}
export class CategoryDTO {
  constructor(public id: number, public name: string) {}
}
