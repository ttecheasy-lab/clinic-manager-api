import { randomUUIDv7 } from "bun";

export class UniqueEntityId {
  private value: string;

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUIDv7();
  }

  public equals(id: UniqueEntityId): boolean {
    return id.toValue() === this.value;
  }
}
