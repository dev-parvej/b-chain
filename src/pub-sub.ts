import { createClient, RedisClient } from 'redis';
import BlockChain from './block/block-chain';

export const CHANNEL = {
  TEST: 'Test',
  BLOCKCHAIN: 'BLOCKCHAIN'
};

export default class PubSub {
  publisher: RedisClient;
  subscriber: RedisClient;
  blockChain: BlockChain;

  constructor(blockChain: BlockChain) {
    this.blockChain = blockChain;
    this.publisher = createClient();
    this.subscriber = createClient();
    this.subscribeToChannel();
    this.subscriber.subscribe(CHANNEL.TEST);

    this.subscriber.on(
      'message',
      (channel, message) => this.handleMessage(channel, message)
    );
  }

  subscribeToChannel() {
    Object.values(CHANNEL)
      .forEach(channel => this.subscriber.subscribe(channel));
  }

  handleMessage(channel: string, message: string) {
    if (channel === CHANNEL.BLOCKCHAIN) {
      this.blockChain.setChain(JSON.parse(message));
    }
  }

  publish(channel: string, message: string) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish(
      CHANNEL.BLOCKCHAIN,
      JSON.stringify(this.blockChain.getChain())
    );
  }
}
