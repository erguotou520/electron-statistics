const User = require('../../schemas/user')
const { commonUserSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/users/new', {
    schema: commonUserSchema
  }, async (request, reply) => {
    const { from, to } = request.query
    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${from} 00:00:00`),
            $lt: new Date(`${to} 23:59:59`)
          }
        }
      },
      {
        $addFields: {
          createdTime: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          }
        }
      },
      {
        $group: {
          _id: '$createdTime',
          count: {
            $sum: 1
          }
        }
      },
      {
        $addFields: {
          date: '$_id'
        }
      },
      {
        $sort: {
          date: -1
        }
      }
    ])
    reply.send(data)
  })
}
