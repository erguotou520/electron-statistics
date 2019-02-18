const Device = require('../../schemas/device')
const { osSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/devices/os', {
    schema: osSchema
  }, async (request, reply) => {
    const all = await Device.countDocuments()
    const osData = await Device.aggregate([
      {
        $group: {
          _id: '$os',
          count: {
            $sum: 1
          }
        }
      }
    ])
    const versionData = await Device.aggregate([
      {
        $group: {
          _id: '$appVersion',
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          '_id': -1
        }
      },
      {
        $limit: 5
      }
    ])
    const otherVersionCount = all - versionData.reduce((sum, v) => sum + v.count, 0)
    const os = osData.map(os => {
      return {
        os: os._id,
        percent: os.count / all
      }
    })
    const version = versionData.map(ver => {
      return {
        version: ver._id,
        percent: ver.count / all
      }
    })
    if (otherVersionCount > 0) {
      version.push({ version: '其它', percent: otherVersionCount / all })
    }
    reply.send({
      os: os,
      version
    })
  })
}
