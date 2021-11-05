import BlockChain from "./block/block-chain";

const blockChain = new BlockChain()

blockChain.addBlock({ foo: 'bar' })
blockChain.addBlock({ foo: 'buzz' })
blockChain.addBlock({ foo: 'Aldrin' })
blockChain.addBlock({ foo: 'Neil' })
blockChain.addBlock({ foo: 'ArmStrong' })

console.log(blockChain.getChain())