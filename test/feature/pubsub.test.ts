import {connectToRabbitMQ} from "../../src/core/messaging/connect";
import * as dotenv from "dotenv";
import {getConfigHelper} from "../../src/core/config/helper";
import {getConfig} from "../../src/_config";
import {getConsumerFactory, RabbitMessage} from "../../src/lib/pubsub/consumer";
import {getRabbitPublisher} from "../../src/lib/pubsub/publisher";
import {RabbitOpts} from "../../src/lib/pubsub/RabbitOpts";

let channel, connection


beforeEach(async () => {
    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    let result = await connectToRabbitMQ({ config })
    channel = result.channel
    connection = result.connection
})

afterAll(() => {
    setTimeout(() => {
        channel.close()
        connection.close()
    }, 500)
})

test("PubSub library", (done) => {

    let opts: RabbitOpts = {
        exchange: {
            durable: false
        },
        queue: {
            durable: false
        },
        consume: {noAck: true}
    }

    let consumerFactory = getConsumerFactory({ channel, globalOptions: opts })

    let publish = getRabbitPublisher({ channel, globalOptions: opts })

    consumerFactory({ exchange: 'test-ex', queue: 'testQueue' })
        .subscribe((msg: RabbitMessage) => {
            expect(msg.data.key).toBe('val')
            done()
        })

    publish({ exchange: 'test-ex', payload: { key: 'val' }})

})