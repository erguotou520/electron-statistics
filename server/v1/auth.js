const { secret } = require('../config')
const Admin = require('../schemas/admin')

function signUser (fastify, user) {
  return fastify.jwt.sign(user.profile, { expiresIn: '3 days' })
}

module.exports = (fastify) => {
  fastify.register(require('fastify-jwt'), { secret })

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      if (!request.url.endsWith('/login')) {
        await request.jwtVerify()
      }
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.post('/login', async (req, reply) => {
    const { username, password } = req
    try {
      const admin = await Admin.findOne({ username: username.toLowerCase() })
      if (!admin) {
        reply.code(400).send({ message: '账号或密码不正确' })
      } else {
        if (!admin.authenticate(password)) {
          reply.code(400).send({ message: '账号或密码不正确' })
        } else {
          const token = signUser(fastify, admin)
          reply.send({ user: admin.profile, token })
        }
      }
    } catch (error) {
      reply.code(500).send({ message: error })
    }
  })
}
