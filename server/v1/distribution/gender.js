const User = require('../../schemas/user')
const { genderSchema } = require('./schema')

const genderMap = {
  1: '男',
  2: '女',
  3: '其它'
}

module.exports = (fastify) => {
  fastify.get('/distribution/gender', {
    schema: genderSchema
  }, async (request, reply) => {
    const all = await User.countDocuments()
    const data = await User.aggregate([
      {
        $group: {
          _id: '$gender',
          count: {
            $sum: 1
          }
        }
      }
    ])
    const ret = []
    for (const item of data) {
      ret.push({ gender: genderMap[item._id] || '未设置', percent: item.count / all })
    }
    reply.send(ret)
  })
}
