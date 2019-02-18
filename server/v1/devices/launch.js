const Launch = require('../../schemas/launch')
const { launchSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/devices/launch', {
    schema: launchSchema
  }, async (request, reply) => {
    const { from, to } = request.query
    const data = await Launch.aggregate([
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
          launchTime: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          }
        }
      },
      {
        $group: {
          _id: '$launchTime',
          count: {
            $sum: '$count'
          },
          average: {
            $avg: '$count'
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
