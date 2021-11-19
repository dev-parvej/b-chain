import { STARTING_BALANCE } from '../config/config';
import { ec as ECurve } from 'elliptic'
import EC from '../helper/ec';
import { generateHash } from '../helper/crypto-hash';

export default class Wallet {
  public balance: number;
  public publicKey: string;
  private keyPair: ECurve.KeyPair;
  
  constructor() {
    this.balance = STARTING_BALANCE
    this.keyPair = EC.genKeyPair()
    this.publicKey = this.keyPair.getPublic().encodeCompressed('hex')
  }

  sign(data: unknown) {
    return this.keyPair.sign(generateHash([data]))
  }
}