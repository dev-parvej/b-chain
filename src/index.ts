import Block from './block/block'

const block = Block.mineBlock(Block.genesis(), { foo: 'Bar and Buzz' })
console.log(block)