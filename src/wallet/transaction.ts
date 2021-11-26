import { v1 as uuid } from 'uuid';
import { ec } from 'elliptic';
import Wallet from './Index';
import Signature = ec.Signature;
import verifySignature from '../helper/verifySignature';

export interface TransactionInputInterface {
  timestamp: number,
  amount: number,
  address: string,
  signature: Signature
}

export default class Transaction {
  public id: string;

  public outputMap: { [p: string]: number };

  public input: TransactionInputInterface

  constructor(senderWallet: Wallet, recipient: string, amount: number) {
    this.id = uuid();
    this.outputMap = this.createOutputMap(senderWallet, recipient, amount);
    this.input = this.createInput(senderWallet, this.outputMap);
  }

  createOutputMap(senderWallet: Wallet, recipient: string, amount: number) {
    const outputMap: { [p: string]: number } = {};
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }

  createInput(senderWallet: Wallet, outputMap: unknown): TransactionInputInterface {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    };
  }

  update(senderWallet: Wallet, recipient: string, amount: number) {
    if (amount > this.outputMap[senderWallet.publicKey]) {
      throw new Error('Amount exceeds balance');
    }
    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] += amount;
    }
    this.outputMap[senderWallet.publicKey] -= amount;
    this.input = this.createInput(senderWallet, this.outputMap);
  }

  static isValid(transaction: Transaction) {
    const { input: { address, amount, signature }, outputMap } = transaction;
    const totalAmount = Object.values(outputMap)
      .reduce((total: number, value: number) => total + value);

    if (totalAmount !== amount) {
      console.error(`Invalid amount from ${address}`);
      return false;
    }

    if (!verifySignature(address, outputMap, signature)) {
      console.error(`Invalid signature from ${address}`);
      return false;
    }

    return true;
  }
}
