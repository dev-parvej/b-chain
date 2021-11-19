import { ec as ECurve } from 'elliptic';
import { STARTING_BALANCE } from '../config';
import EC from '../helper/ec';
import { generateHash } from '../helper/crypto-hash';
import Transaction from './transaction';

export default class Wallet {
  public balance: number;

  public publicKey: string;

  private keyPair: ECurve.KeyPair;

  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = EC.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encodeCompressed('hex');
  }

  sign(data: unknown) {
    return this.keyPair.sign(generateHash([data]));
  }

  createTransaction(amount: number, recipient: string) {
    if (amount > this.balance) {
      throw new Error('Amount exceeds balance');
    }

    return new Transaction(this, recipient, amount);
  }
}
