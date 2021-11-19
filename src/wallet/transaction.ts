import { v1 as uuid } from 'uuid';

export default class Transaction {
  public id: string;
  public outMap: unknown;

  constructor() {
    this.id = uuid()
  }
}