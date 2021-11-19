import { type } from 'os';
import { GENESIS_DATA, MINE_RATE } from '../config';
import { generateHash } from '../helper/crypto-hash';
import hexToBinary from '../helper/hexToBinary';

export default class Block {
    timestamp: number;

    hash: string;

    lastHash: string;

    data: unknown

    nonce: number

    difficulty: number

    constructor(timestamp: number, hash: string, lastHash: string, data: unknown, nonce = 0, difficulty = 4) {
      this.timestamp = timestamp;
      this.hash = hash;
      this.lastHash = lastHash;
      this.data = data;
      this.nonce = nonce;
      this.difficulty = difficulty;
    }

    public static isSame(block: Block, blockToCompare: Block) {
      const blockKeys = Object.keys(block);
      const failed = Object.keys(blockToCompare).filter((key) => {
        const currentBlock = blockToCompare as any;
        const passedBlock = block as any;
        if (typeof passedBlock[key] === 'object' && typeof currentBlock[key] === 'object') {
          return !blockKeys.includes(key)
                    || JSON.stringify(currentBlock[key]) !== JSON.stringify(passedBlock[key]);
        }
        return !blockKeys.includes(key) || currentBlock[key] !== passedBlock[key];
      });

      return !(failed.length);
    }

    static isNotSame(block: Block, blockToCompare: Block) {
      return !this.isSame(block, blockToCompare);
    }

    static genesis() {
      return new Block(
        GENESIS_DATA.timestamp,
        GENESIS_DATA.hash,
        GENESIS_DATA.lastHash,
        GENESIS_DATA.data,
        GENESIS_DATA.nonce,
        GENESIS_DATA.difficulty,
      );
    }

    static mineBlock(lastBlock: Block, data: { [p: string]: unknown }) {
      const lastHash = lastBlock.hash;
      let timestamp;
      let hash = '';
      let { difficulty } = lastBlock;
      let nonce = 0;

      do {
        nonce++;
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty(lastBlock, timestamp);
        hash = generateHash([lastHash, data, timestamp, nonce, difficulty]);
      } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

      return new Block(timestamp, hash, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock: Block, timestamp: number) {
      const { difficulty } = lastBlock;

      if (lastBlock.difficulty < 1) {
        return 1;
      }

      if ((timestamp - lastBlock.timestamp) > MINE_RATE) {
        return difficulty - 1;
      }
      return difficulty + 1;
    }
}
