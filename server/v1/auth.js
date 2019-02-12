const { secret } = require('../config')
const Admin = require('../schemas/admin')

function signUser (fastify, user) {
  return fastify.jwt.sign(user.profile, { expiresIn: '3 days' })
}

module.exports = (fastify) => {
  fastify.register(require('fastify-jwt'), { secret })

  fastify.addHook('preHandler', async (request, reply) => {
    try {
      if (!request.req.url.match(/api\/v\d+(\/login$|\/web.gif)/)) {
        await request.jwtVerify()
      }
    } catch (err) {
      reply.send(err)
    }
  })

  // login
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        },
        required: ['username', 'password']
      }
    }
  }, async (req, reply) => {
    const { username, password } = req.body
    try {
      const admin = await Admin.findOne({ username })
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
      reply.code(500).send({ message: error.message || error })
    }
  })

  // update password
  fastify.put('/updatePwd', {
    schema: {
      body: {
        type: 'object',
        properties: {
          oldPassword: {
            type: 'string'
          },
          newPassword: {
            type: 'string'
          }
        },
        required: ['oldPassword', 'newPassword']
      }
    }
  }, async (req, reply) => {
    const { oldPassword, newPassword } = req.body
    try {
      const admin = await Admin.findOne({ _id: req.user.id })
      if (!admin) {
        reply.code(500).send({ message: '没有找到用户' })
      } else {
        if (!admin.authenticate(oldPassword)) {
          reply.code(403).send({ message: '旧密码不正确' })
        } else {
          admin.password = newPassword
          await admin.save()
          reply.send({})
        }
      }
    } catch (error) {
      reply.code(500).send({ message: error.message || error })
    }
  })
}
