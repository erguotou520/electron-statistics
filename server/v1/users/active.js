const Online = require('../../schemas/online')
const { commonUserSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/users/active', {
    schema: commonUserSchema
  }, async (request, reply) => {
    const { from, to } = request.query
    const data = await Online.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(`${from} 00:00:00`),
            $lt: new Date(`${to} 23:59:59`)
          }
        }
      },
      {
        $addFields: {
          activeTime: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$time'
            }
          }
        }
      },
      {
        $group: {
          _id: '$activeTime',
          userList: {
            $addToSet: '$userId'
          }
        }
      },
      {
        $addFields: {
          date: '$_id',
          count: {
            $size: '$userList'
          }
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
