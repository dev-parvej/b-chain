import EC from  './ec'
import { generateHash } from './crypto-hash';
import { ec } from 'elliptic';
import Signature = ec.Signature;

export default function(publicKey: string, data: unknown, signature: Signature) {
  const keyFromPublic = EC.keyFromPublic(publicKey, 'hex')

  return keyFromPublic.verify(generateHash([data]), signature)
}