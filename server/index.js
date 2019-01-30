// Require the framework and instantiate it
const fastify = require('fastify')({ logger: { level: 'warn' } })
const config = require('./config')

// Mongoose
fastify.register(require('./mongo'), {
  uri: config.mongoUri
}, err => {
  if (err) throw err
})
require('./schemas')

// Routes
fastify.get('/', async () => '让你点我了么')
fastify.register(require('./v1'), { prefix: '/api/v1' })

// Run the server!
fastify.listen(config.serverPort, config.serverHost, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
