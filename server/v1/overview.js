const dayjs = require('dayjs')
const User = require('../schemas/user')
const Online = require('../schemas/online.js')

module.exports = (fastify) => {
  fastify.get('/overview', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            newUserCount: {
              type: 'number'
            },
            activeUserCount: {
              type: 'number'
            },
            onlineTimeCount: {
              type: 'number'
            }
          }
        }
      }
    }
  }, async (_, reply) => {
    const todayFrom = dayjs().startOf('day').toDate()
    const todayTo = dayjs().endOf('day').toDate()
    const newUserCount = await User.countDocuments({
      createdAt: {
        $gte: todayFrom,
        $lt: todayTo
      }
    })
    const activeUsers = await Online.aggregate([
      {
        $match: {
          time: {
            $gte: todayFrom,
            $lt: todayTo
          }
        }
      },
      {
        $group: {
          _id: '$userId'
        }
      },
      {
        $count: 'count'
      }
    ])
    const onlineTimes = await Online.aggregate([
      {
        $match: {
          time: {
            $gte: todayFrom,
            $lt: todayTo
          }
        }
      },
      {
        $group: {
          _id: 'null',
          total: {
            $sum: '$duration'
          }
        }
      }
    ])
    reply.send({
      newUserCount,
      activeUserCount: activeUsers[0] ? activeUsers[0].count : 0,
      onlineTimeCount: onlineTimes[0] ? Math.round(10 * onlineTimes[0].total / 3600) / 10 : 0
    })
  })
}
