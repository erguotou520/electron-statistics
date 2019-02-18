const Online = require('../../schemas/online')
const { ipSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/distribution/geo', {
    schema: ipSchema
  }, async (request, reply) => {
    const data = await Online.aggregate([
      {
        $group: {
          _id: {
            deviceId: '$deviceId',
            ip: '$ip'
          },
          province: {
            $first: '$province'
          }
        }
      },
      {
        $group: {
          _id: '$province',
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ])
    const all = data.reduce((sum, g) => sum + g.count, 0)
    reply.send(data.map(item => {
      return {
        province: item._id || '未设置',
        percent: item.count / all
      }
    }))
  })
}
