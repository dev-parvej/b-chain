import {GENESIS_DATA} from "../config/config";
import {generateHash} from "../utls/crypto-hash";

export default class Block {
    private timestamp: Date;
    private hash: string;
    private lastHash: string;
    private data: unknown

    constructor(timestamp: Date, hash: string, lastHash: string, data: unknown ) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data
    }

    static genesis() {
        return new Block(
            GENESIS_DATA.timestamp,
            generateHash(Object.values(GENESIS_DATA)),
            GENESIS_DATA.lastHash,
            GENESIS_DATA.data
        )
    }
    static mineBlock(lastBlock: Block, data: { [p: string]: any }) {
        const lastHash = lastBlock.hash;
        const timestamp = new Date();
        const hash = generateHash([lastHash, data, timestamp]);

        return new Block(timestamp, hash, lastHash, data)
    }
}