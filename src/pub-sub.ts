import {createClient, RedisClient} from "redis";
export const CHANNEL = { TEST: 'Test' }

export default class PubSub {
    publisher: RedisClient;
    subscriber: RedisClient;

    constructor() {
        this.publisher = createClient();
        this.subscriber = createClient();
        this.subscriber.subscribe(CHANNEL.TEST);

        this.subscriber.on('message', this.handleMessage)
    }

    handleMessage(channel: string, message: string) {
        console.log(`Hello from channel '${channel}' with message '${message}'`)
    }
}
