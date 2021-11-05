import Block from "./block";
import {generateHash} from "../utls/crypto-hash";

export default class BlockChain {
    private chain: Block[] = []

    constructor() {
        this.chain = [Block.genesis()]
    }

    public getChain() {
        return this.chain;
    }

    public setChain(chain: Block[]) {
        if (chain.length <= this.chain.length) {
            return;
        }
        if (!this.isValid(chain)) {
            return;
        }
        this.chain = chain;
    }

    public getChainFromHash(hash: string) {
        return this.getChain()
            .find((block: Block) => block.hash === hash)
    }

    public addBlock(data: { [p: string]: any }) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block)

        return block;
    }

    public isValid(chain: Block[] | null = null) {
        const blocks = chain ? chain : this.chain;

        if (blocks[0].isNotSame(Block.genesis())) {
            return false;
        }

        return !blocks.find((block: Block, index) => {
            if (index === 0) {
                return false;
            }

            const lastBlock = this.chain[index - 1];
            if (block.lastHash != lastBlock.hash) {
                return true;
            }

            const generatedHash = generateHash([
                block.lastHash,
                block.timestamp,
                block.data,
                block.nonce,
                block.difficulty
            ]);
            return generatedHash != block.hash;
        });


    }
}