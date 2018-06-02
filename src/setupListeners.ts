import {Pipe} from "./pipes/Pipe";

const OUTPUT_EX = 'services.events'
const INPUT_EX = 'services.digest'

export const setupListeners = ({ registry, dbConn, channel }) => {

    channel.assertExchange(OUTPUT_EX, 'topic', {durable: false})
    channel.assertExchange(INPUT_EX, 'topic', {durable: false})

    const pipesRepo = dbConn.getRepository(Pipe)

    registry.forEach( service => {
        service.events.forEach( async (event) => {

            // binds to all instances of the service
            let routingKey = `${service.key}.*.${event.key}`
            let q = await channel.assertQueue('', {exclusive: true})
            channel.bindQueue(q.queue, OUTPUT_EX, routingKey)
            console.log(`listening to (${routingKey}) on exchange (${OUTPUT_EX})`)

            let handler = async (msg) => {
                let pipes = await pipesRepo.find({ event: routingKey })

                console.log(`(${routingKey}) => ${msg.content.toString()}`)
                console.log('...piping message => ', pipes)

                pipes.forEach( pipe => {
                    channel.publish(INPUT_EX, pipe.digest, msg.content)
                })
            }

            channel.consume(q.queue, handler, {noAck: true})
        })
    })
}