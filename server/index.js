const qs = require('qs')
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: { level: 'info' },
  querystringParser: str => {
    return qs.parse(str)
  }
})
const config = require('./config')

// Mongoose
fastify.register(require('./mongo'), {
  uri: config.mongoUri
}, err => {
  if (err) throw err
})
require('./schemas')

// cors
fastify.register(require('fastify-cors'), {})

// Routes
fastify.get('/', async () => 'Hello server')
fastify.register(require('./v1'), { prefix: '/api/v1' })

// seed
require('./seed')()

// Run the server!
fastify.listen(config.serverPort, config.serverHost, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
