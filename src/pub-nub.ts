import DefaultPubNUb from "pubnub";

export enum PUP_NUB_CONFIGURATION {
    publishKey = 'pub-c-4d520463-a2ea-439b-bf05-b826f5c5e912',
    subscribeKey = 'sub-c-391387fa-3f22-11ec-b886-526a8555c638',
    secretKey = 'sec-c-ZmExYTkzN2MtMzRkMi00N2FmLTg5NGQtNmQ0ZDRkYTQzYmZi'
}

export enum ChannelEnum {
    TEST = 'TEST'
}

export default class PubNub {
    pubNub: DefaultPubNUb

    constructor() {
        this.pubNub = new DefaultPubNUb({
            publishKey: PUP_NUB_CONFIGURATION.publishKey,
            secretKey: PUP_NUB_CONFIGURATION.secretKey,
            subscribeKey: PUP_NUB_CONFIGURATION.secretKey,
            uuid: 'this-is-an-unique-id'
        })

        this.pubNub.subscribe({ channels: [ ChannelEnum.TEST ] })

        this.pubNub.addListener(this.listener())
    }

    listener(): DefaultPubNUb.ListenerParameters {
        return {
            message: messageObject => {
                const  { message, channel } = messageObject
                console.log(`A very important message '${message}' from channel '${channel}'`);
            }
        }
    }

    publish(message: string, channel: string) {
        this.pubNub.publish({ channel, message })
    }
}
