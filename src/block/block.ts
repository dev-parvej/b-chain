import {GENESIS_DATA, MINE_RATE} from "../config/config";
import {generateHash} from "../utls/crypto-hash";
import hexToBinary from "../helper/hexToBinary";

export default class Block {
    timestamp: number;
    hash: string;
    lastHash: string;
    data: unknown
    nonce: number
    difficulty: number

    constructor(timestamp: number, hash: string, lastHash: string, data: unknown, nonce = 0, difficulty = 4 ) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty
    }

    public isSame(block: Block) {
        const blockKeys = Object.keys(block);
        const failed = Object.keys(this).filter((key) => {
            const currentBlock = this as any;
            const passedBlock = block as any;
            return !blockKeys.includes(key) || currentBlock[key] !== passedBlock[key]
        });

        return !(failed.length)
    }

    isNotSame(block: Block) {
        return !this.isSame(block)
    }

    static genesis() {
        return new Block(
            GENESIS_DATA.timestamp,
            GENESIS_DATA.hash,
            GENESIS_DATA.lastHash,
            GENESIS_DATA.data,
            GENESIS_DATA.nonce,
            GENESIS_DATA.difficulty
        )
    }
    static mineBlock(lastBlock: Block, data: { [p: string]: unknown }) {
        const lastHash = lastBlock.hash;
        let timestamp;
        let hash = '';
        let difficulty = lastBlock.difficulty
        let nonce = 0

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = generateHash([lastHash, data, timestamp, nonce, difficulty]);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))

        return new Block(timestamp, hash, lastHash, data, nonce, difficulty)
    }

    static adjustDifficulty(lastBlock: Block, timestamp: number) {
        const { difficulty } = lastBlock

        if (lastBlock.difficulty < 1) {
            return 1;
        }

        if ((timestamp - lastBlock.timestamp) > MINE_RATE) {
            return difficulty - 1;
        }
        return difficulty + 1;
    }
}